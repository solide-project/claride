import { Configuration, SmartContractsApi, SmartContractsApiInterface } from "@stacks/blockchain-api-client"
import { getAPI } from "../chains/api"
import { parseContractId } from "@stacks/transactions"

export interface EthGetSourceCodeInterface {
    status: string
    message: string
    result: ContractInfo[] | string
}

export interface ContractInfo {
    SourceCode: string
    ABI: string
    ContractName: string
    CompilerVersion: string
    OptimizationUsed: string
    Runs: string
    ConstructorArguments: string
    EVMVersion: string
    Library: string
    LicenseType: string
    Proxy: string
    Implementation: string
    SwarmSource: string
}

export const getSourceCode = async (
    chain: string,
    address: string
): Promise<EthGetSourceCodeInterface> => {
    try {
        const basePath = getAPI(chain)
        const apiConfig: Configuration = new Configuration({
            fetchApi: fetch,
            basePath,
            apiKey: process.env.API_KEY
        });

        const contractsApi: SmartContractsApiInterface = new SmartContractsApi(apiConfig);
        const data = await contractsApi.getContractById({ contractId: address })
        const [contractAddress, contractName] = parseContractId(data.contract_id as `${string}.${string}`)
        if (!contractName) {
            return generateError("Fail to found contract name")
        }

        let sourceInput: any = {
            sources: {},
        };

        const contractPath = `contracts/${contractName}.clar`
        sourceInput.sources[`contracts/${contractName}.clar`] = { content: data.source_code || "" };

        const tomlContent =
            `
[project]
name = '${contractName}'
description = ''
authors = []
telemetry = false
cache_dir = './.cache'
requirements = []

[contracts.${contractName}]
path = '${contractPath}'
clarity_version = 3
epoch = 3.1
[repl.analysis]
passes = ['check_checker']

[repl.analysis.check_checker]
strict = false
trusted_sender = false
trusted_caller = false
callee_filter = false
        `.trim()
        sourceInput.sources["Clarinet.toml"] = { content: tomlContent || "" }

        const ret: EthGetSourceCodeInterface = {} as EthGetSourceCodeInterface
        const result = {
            SourceCode: `{${JSON.stringify(sourceInput)}}`,
            ABI: data.abi || "",
            ContractName: contractName,
            CompilerVersion: (data as any).clarity_version || "3",
            OptimizationUsed: "0",
            Runs: "",
            ConstructorArguments: "",
            EVMVersion: "",
            Library: "",
            LicenseType: "0",
            Proxy: "",
            Implementation: "",
            SwarmSource: "",
        }

        ret.result = [result]

        return ret
    } catch (e: any) {
        console.log(e.message)
        return generateError("Error may not be a valid contract")
    }
}

const generateError = (error: string) => {
    return {
        result: error,
    } as EthGetSourceCodeInterface
}
