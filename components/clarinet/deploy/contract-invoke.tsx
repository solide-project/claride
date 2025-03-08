import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useLogger } from "@/components/core/providers/logger-provider";
import { CollapsibleChevron } from "@/components/core/components/collapsible-chevron";
import { Title } from "@/components/core/components/title";
import { useWeb3Hook } from "./hook-web3";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { toNative } from "@/lib/stacks/parser"
import { ArrowRight } from "lucide-react";
import { getTransactionExplorer } from "@/lib/chains/explorer";
import { useFileSystem } from "@/components/core/providers/file-provider";
import { ConnectWallet } from "../connect";
import { isConnected } from "@stacks/connect";
import { AbiParameter } from "@/lib/stacks/abi";
import { ClarityAbiFunction } from "@stacks/transactions";

const CONSTRUCTOR_METHOD = "constructor"

interface ContractInvokeProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ContractInvoke({ className }: ContractInvokeProps) {
    const web3Hook = useWeb3Hook();
    const logger = useLogger();
    const vfs = useFileSystem();

    const [msgValue, setMsgValue] = useState<number>(0)
    const [contractAddress, setContractAddress] = useState<string>("")
    const [ret, setRet] = useState<{
        [key: string]: any
    }>({})

    //#region Deploy
    const [isDeploying, setIsDeploying] = useState(false)

    const handleDeploy = async () => {
        try {
            setIsDeploying(true)
            await doDeploy();
        } catch (e: any) {
            logger.error(e.message || "Error deploying contract")
            console.error(e)
        } finally {
            setIsDeploying(false)
        }
    }

    const doDeploy = async () => {
        if (!isConnected()) {
            throw new Error("Not authenticated")
        }

        logger.info("Deploying contract...")

        // This is to determined if we are deploying an existing contract
        let contractName = ""
        let codeBody = ""
        if (!contractAddress) {
            contractName = "counter";
            codeBody = vfs.vfs.cat("contracts/nft-marketplace.clar")?.content || "";
        }

        const result = await web3Hook.doDeploy({ contractAddress, contractName: "counter", codeBody })
        if (result.contract) {
            setContractAddress(result.contract)
            logger.success(`Contract deployed at ${result.contract}`)

            setContractArguments({
                ...contractArguments,
                [result.contract]: {},
            })
        } else {
            logger.error(`Error deploying contract: ${result.transactionHash}`)
        }
    }
    //#endregion

    //#region Params State
    /**
     * Note we are storing constructor arguments in here as method name "constructor"
     */
    const [contractArguments, setContractArguments] = useState<{
        [contractAddress: string]: {
            [method: string]: { [parameter: string]: any }
        }
    }>({})
    const handleArgumentChange = (
        contractAddress: string,
        method: string,
        name: string,
        value: string
    ) => {
        setContractArguments((prevArgs) => ({
            ...prevArgs,
            [contractAddress]: {
                ...prevArgs[contractAddress],
                [method]: {
                    ...prevArgs[contractAddress]?.[method],
                    [name]: value,
                },
            },
        }))
    }

    const formatParameters = (entry: ClarityAbiFunction): any[] => {
        if (!entry) return []

        const method = entry.name
        const selected = selectedContractAddress

        const methodArgs = contractArguments[selected]?.[method]
        if (!methodArgs) return []

        console.log(methodArgs)
        return entry.args.map((input: AbiParameter, index: number) =>
            toNative(methodArgs[input.name || index.toString()], input)
        )
    }
    //#endregion

    //#region Contract Calls
    const [isInvoking, setIsInvoking] = useState<boolean>(false)

    const initialiseInvocation = (method: string) => {
        if (!selectedAbiParameter) {
            throw new Error("No method selected")
        }

        setIsInvoking(true)
        logger.info(
            <div className="flex items-center gap-2">
                <ArrowRight size={18} /> <div>{method}()</div>
            </div>
        )
    }

    const invokeSend = async (method: string) => {
        try {
            initialiseInvocation(method)

            // This should be the transaction hash
            console.log(msgValue)
            const result = await web3Hook.executeSend(
                selectedContractAddress,
                method,
                formatParameters(selectedAbiParameter!),
                msgValue
            )
            const tx = result.toString()

            // formatOutput(selectedAbiParameter, result)
            const hex = await window.ethereum.request({ method: "eth_chainId" })
            const chainId = parseInt(hex, 16).toString()
            const txExplorer = getTransactionExplorer(chainId, tx)
            if (txExplorer) {
                logger.success(
                    <a className="underline" href={txExplorer} target="_blank">
                        {tx}
                    </a>
                )
            } else {
                logger.success(tx)
            }
        } catch (error: any) {
            logger.error(handleError(error), true)
        } finally {
            setSelectedAbiParameter(null)
            setIsInvoking(false)
        }
    }

    const invokeCall = async (method: string) => {
        try {
            initialiseInvocation(method)

            // This should be the transaction hash
            const result = await web3Hook.executeCall(
                selectedContractAddress,
                method,
                formatParameters(selectedAbiParameter!)
            )

            // formatOutput(selectedAbiParameter!, result)
        } catch (error: any) {
            logger.error(handleError(error), true)
        } finally {
            setSelectedAbiParameter(null)
            setIsInvoking(false)
        }
    }

    const formatOutput = (entry: ClarityAbiFunction, result: any) => {
        console.log("formatOutput", entry, result)
        // if (entry.outputs && entry.outputs.length > 0) {
        //     if (typeof result === "object") {
        //         result = JSON.stringify(result, (_, v) =>
        //             typeof v === "bigint" ? v.toString() : v
        //         )
        //     } else if (entry.outputs[0].type.includes("int")) {
        //         result = result.toString() as BigInt
        //     } else {
        //         result = result as string
        //     }

        //     logger.info(
        //         <div className="flex items-center gap-2">
        //             <ArrowLeft size={18} /> <div>{result}</div>
        //         </div>
        //     )
        //     setRet({ ...ret, [entry.name]: result })
        // } else {
        //     logger.success(result)
        //     setRet({ ...ret, [entry.name]: result })
        // }
    }
    //#endregion

    const handleError = (error: any) => {
        let msg = error && error.toString()
        if (typeof error === "object") {
            msg = error?.message.toString() || "Error deploying contract"
        }

        return `${msg.toString()}`
    }

    const [selectedContractAddress, setSelectedContractAddress] =
        useState<string>("")
    const [selectedAbiParameter, setSelectedAbiParameter] =
        useState<ClarityAbiFunction | null>(null)

    const handleRemoveContract = (contractAddress: string) => {
        web3Hook.removeContract(contractAddress)
    }
    return <div>
        <ConnectWallet />

        <div className="flex">
            <Button
                size="sm"
                onClick={handleDeploy}
                variant="default"
                disabled={isDeploying}
            >
                Deploy
            </Button>
            <Input
                className="h-9 rounded-md px-3"
                placeholder="Contract Address"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
            />
        </div>

        <div className="flex items-center justify-center">
            <div className="py-2 font-semibold text-grayscale-350">Value (wei)</div>
            <Input
                className="h-9 rounded-md px-3"
                placeholder="Value"
                type="number"
                value={msgValue}
                onChange={(e) => setMsgValue(parseInt(e.target.value) || 0)}
            />
        </div>

        <Title text="Deployed Contracts" />
        {Object.entries(web3Hook.contracts).map(([key, val], index) => {
            return (
                <CollapsibleChevron
                    key={index}
                    name={key}
                    onClosed={() => handleRemoveContract(key)}
                >
                    <div className="flex flex-wrap gap-2">
                        {(val.abi.functions as ClarityAbiFunction[])
                            // .filter((abi) => abi.type === "function")
                            .map((abi: ClarityAbiFunction, methodsIndex: number) => {
                                return (
                                    <Button
                                        key={methodsIndex}
                                        onClick={() => {
                                            setSelectedContractAddress(key)
                                            setSelectedAbiParameter(abi)
                                        }}
                                        size="sm"
                                    >
                                        {abi.name}
                                    </Button>
                                )
                            })}
                    </div>
                </CollapsibleChevron>
            )
        })}

        <Dialog
            open={!!selectedAbiParameter}
            onOpenChange={() => {
                setSelectedContractAddress("")
                setSelectedAbiParameter(null)
            }}
        >
            <DialogContent className="max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>
                        {selectedAbiParameter?.name || "Unknown"}
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                {selectedAbiParameter && (
                    <>
                        {selectedAbiParameter.args.map(
                            (input: AbiParameter, abiIndex: number) => {
                                return (
                                    <div
                                        key={abiIndex}
                                        className="flex items-center space-x-2 py-1"
                                    >
                                        <div>{input.name}</div>

                                        <Input
                                            value={
                                                contractArguments[selectedContractAddress]?.[
                                                selectedAbiParameter.name
                                                ]?.[input.name || abiIndex.toString()]
                                            }
                                            placeholder={input.type.toString()}
                                            onChange={(e) =>
                                                handleArgumentChange(
                                                    selectedContractAddress,
                                                    selectedAbiParameter.name,
                                                    input.name || abiIndex.toString(),
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                )
                            }
                        )}

                        <Button
                            onClick={() => {
                                if (selectedAbiParameter.access === "read_only") {
                                    invokeCall(selectedAbiParameter.name)
                                    return
                                } else {
                                    invokeSend(selectedAbiParameter.name)
                                }
                            }}
                            disabled={isInvoking}
                        >
                            {isInvoking
                                ? "Invoking..."
                                : selectedAbiParameter.access === "read_only"
                                    ? "Call"
                                    : "Send"}
                        </Button>
                    </>
                )}
            </DialogContent>
        </Dialog>
    </div>
}
