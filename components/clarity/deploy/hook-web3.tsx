import { useState } from "react"

import { DeployedContracts } from "@/lib/stacks/interfaces"
import { request } from "@stacks/connect"
import { StacksSmartContract } from "@/lib/stacks/contract"
import { ChainID } from "@/lib/chains"
import { useClarity } from "../clarity-provider";
import { Configuration, TransactionsApi, TransactionsApiInterface } from "@stacks/blockchain-api-client";
import { getAPI } from "@/lib/chains/api";

export const useWeb3Hook = () => {
    const [contracts, setContracts] = useState<DeployedContracts>({})
    const { selectedNetwork } = useClarity()

    const executeSend = async (
        contractAddress: string,
        method: string,
        args: any[],
        value: number = 0,
        userAddress: string
    ) => {
        if (!contracts.hasOwnProperty(contractAddress)) {
            throw new Error("Contract not loaded")
        }

        return contracts[contractAddress].send({
            method,
            args,
            value: value.toString(),
            userAddress
        })
    }

    const executeCall = async (
        contractAddress: string,
        method: string,
        args: any[]
    ) => {
        if (!contracts.hasOwnProperty(contractAddress)) {
            throw new Error("Contract not loaded")
        }

        return contracts[contractAddress].call({ method, args })
    }

    const removeContract = (contractAddress: string) => {
        if (contracts.hasOwnProperty(contractAddress)) {
            delete contracts[contractAddress]
            setContracts({ ...contracts })
        }
    }

    const doDeploy = async ({
        contractAddress,
        contractName,
        codeBody,
        userAddress,
    }: {
        contractAddress?: string
        contractName: string
        codeBody: string
        userAddress: string
    }) => {
        const chainId = selectedNetwork.chainId.toString()
        if (contractAddress) {
            const contract = new StacksSmartContract(contractAddress, chainId)
            await contract.init()
            setContracts({
                ...contracts,
                [contractAddress]: contract,
            })
            return { contract: contractAddress, transactionHash: "" }
        }

        let network = "testnet"
        if (chainId === ChainID.STACKS) {
            network = "testnet"
        } else if (chainId === ChainID.STACKS_TESTNET) {
            network = "mainnet"
        }

        const contractId = `${userAddress}.${contractName}`

        try {
            const response = await request('stx_deployContract', {
                name: contractName,
                clarityCode: codeBody,
                clarityVersion: '3',
                network,
            });

            const contract = new StacksSmartContract(contractId, chainId);
            await contract.init();
            setContracts({
                ...contracts,
                [contractId]: contract,
            });

            return {
                contract: contractId,
                transactionHash: response.txid,
            };
        } catch (err) {
            console.log("Manual Getting Contract Info ...")
            const apiConfig: Configuration = new Configuration({
                fetchApi: fetch,
                basePath: getAPI(chainId),
            });

            const transactionsApi: TransactionsApiInterface = new TransactionsApi(apiConfig);
            const contractTx = await foundPendingContractTx(transactionsApi, userAddress, contractId);

            if (!contractTx) {
                throw new Error("Fail to found contract tx");
            }

            let attempts = 0;
            while (attempts < 10) {
                await delay(5000);
                const tx = await foundPendingContractTx(transactionsApi, userAddress, contractId);
                if (tx) {
                    attempts += 1;
                } else {
                    break;
                }
            }

            const contract = new StacksSmartContract(contractId, chainId);
            await contract.init();
            setContracts({
                ...contracts,
                [contractId]: contract,
            });

            return {
                contract: contractId,
                transactionHash: contractTx?.tx_id,
            };
        }
    }

    return {
        executeCall,
        executeSend,
        doDeploy,

        contracts,
        removeContract,
    }
}

const foundPendingContractTx = async (transactionsApi: TransactionsApiInterface, userAddress: string, contractId: string) => {
    const txs = await transactionsApi.getAddressMempoolTransactions({
        address: userAddress
    })
    const tx: any = txs.results.filter((tx: any) => tx.tx_type === "smart_contract"
        && tx.smart_contract.contract_id === contractId).pop()

    return tx;
}

const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// makeContractDeploy
// await openContractDeploy({
//     network: STACKS_TESTNET,
//     postConditionMode: 0x01,
//     codeBody,
//     contractName,
//     onFinish: (data: FinishedTxData) => {
//         console.log(data)
//     },
// });