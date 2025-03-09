import { useState } from "react"

import { DeployedContracts } from "@/lib/stacks/interfaces"
import { FinishedTxData, request } from "@stacks/connect"
import { STACKS_TESTNET } from '@stacks/network';
import { StacksSmartContract } from "@/lib/stacks/contract"
import { ChainID } from "@/lib/chains"
import { useClarity } from "../clarity-provider";

export const useWeb3Hook = () => {
    const [contracts, setContracts] = useState<DeployedContracts>({})
    const { selectedNetwork } = useClarity()

    const executeSend = async (
        contractAddress: string,
        method: string,
        args: any[],
        value: number = 0
    ) => {
        if (!contracts.hasOwnProperty(contractAddress)) {
            throw new Error("Contract not loaded")
        }

        return contracts[contractAddress].send({
            method,
            args,
            value: value.toString(),
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
    }: {
        contractAddress?: string
        contractName: string
        codeBody: string
    }) => {
        if (contractAddress) {
            const contract = new StacksSmartContract(contractAddress, selectedNetwork.chainId.toString())
            await contract.init()
            setContracts({
                ...contracts,
                [contractAddress]: contract,
            })
            return { contract: contractAddress, transactionHash: "" }
        }

        console.log({
            network: STACKS_TESTNET,
            postConditionMode: 0x01,
            codeBody,
            contractName,
            onFinish: (data: FinishedTxData) => {
                console.log(data)
            },
        })

        const response = await request('stx_deployContract', {
            name: contractName,
            clarityCode: codeBody,
            clarityVersion: '2',
            network: 'testnet',
        });

        console.log(response)
        // void openContractDeploy({
        //     network: STACKS_TESTNET,
        //     postConditionMode: 0x01,
        //     codeBody,
        //     contractName,
        //     onFinish: (data: FinishedTxData) => {
        //         console.log(data)
        //     },
        // });

        // const result = await deploy(deployData)
        // contractAddress = result.contract as string
        // setContracts({
        //     ...contracts,
        //     [getAddress(contractAddress)]: new EVMSmartContract(contractAddress, abi),
        // })

        return {}
    }

    return {
        executeCall,
        executeSend,
        doDeploy,

        contracts,
        removeContract,
    }
}
