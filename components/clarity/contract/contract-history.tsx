import { Title } from "@/components/core/components/title";
import { useLogger } from "@/components/core/providers/logger-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAPI } from "@/lib/chains/api";
import { cn } from "@/lib/utils";
import { Configuration, TransactionsApi, TransactionsApiInterface } from "@stacks/blockchain-api-client";
import { getLocalStorage } from "@stacks/connect";
import { parseContractId } from "@stacks/transactions";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useClarity } from "../clarity-provider";

interface ContractHistoryProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ContractHistory({ className }: ContractHistoryProps) {
    const { push } = useRouter()
    const logger = useLogger()
    const { selectedNetwork } = useClarity()

    const [userAddress, setUserAddress] = useState("")
    const [userContracts, setUserContracts] = useState<{ [user: string]: object[] }>({})

    useEffect(() => {
        (async () => {
            const userData = getLocalStorage()
            const userAddress = userData?.addresses.stx.pop()?.address

            if (!userAddress) {
                return
            }

            setUserAddress(userData?.addresses.stx.pop()?.address || "")
            await searchContracts(userAddress);
        })()
    }, [])

    const searchContracts = async (user: string) => {
        const apiConfig: Configuration = new Configuration({
            fetchApi: fetch,
            basePath: getAPI(selectedNetwork.chainId.toString()),
        });
        const transactionsApi: TransactionsApiInterface = new TransactionsApi(apiConfig);

        const txs = await transactionsApi.getTransactionList({
            limit: 30,
            offset: 0,
            fromAddress: user
        });

        setUserContracts({
            ...userContracts,
            [user]: txs.results.filter((tx: any) => tx.tx_type === "smart_contract")
        })
    }

    const [isSearching, setIsSearching] = useState(false)
    const handleClick = async () => {
        try {
            setIsSearching(true)
            await searchContracts(userAddress);
        } catch (e: any) {
            logger.error("Fail to get user's contracts. Please make sure to make it a valid Stack Address")
            setUserAddress("")
        } finally {
            setIsSearching(false)
        }
    }

    return <div className={cn("px-2 pb-4", className)}>
        <Title text="Explore Contracts" />

        <div className="flex items-center gap-2 my-4">
            <Input type="text" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
            <Button size="icon" onClick={handleClick} disabled={isSearching}>
                <Search />
            </Button>
        </div>

        {userAddress && userContracts[userAddress] && (
            <div className="flex flex-col space-y-2 px-2">
                {userContracts[userAddress].map((item: any, index) => (
                    <div key={index} className="flex items-center justify-between">
                        {parseContractId(item.smart_contract?.contract_id)[1] || "Unknown"}

                        <Button size="sm" variant="outline"
                            onClick={() => push(`/address/${selectedNetwork.chainId.toString()}/${item.smart_contract?.contract_id}`)}
                        >
                            Load Contract
                        </Button>
                    </div>
                ))}
            </div>
        )}
    </div>
}