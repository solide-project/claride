import { useState } from "react"
import { ChevronsUpDown } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useClarinet } from "../clarinet-provider"
import { ChainID, getNetworkNameFromChainID } from "@/lib/chains"
import { STACKS_MAINNET, STACKS_TESTNET } from "@stacks/network"

interface NetworkButtonProps extends React.HTMLAttributes<HTMLDivElement> { }

export function NetworkButton({ className }: NetworkButtonProps) {
    const { selectedNetwork, setSelectedNetwork } = useClarinet()

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string>(selectedNetwork.chainId.toString())

    return <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger
            className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
            {getNetworkNameFromChainID(value || ChainID.STACKS)}
            <ChevronsUpDown className="ml-2 size-4" />
        </PopoverTrigger>
        <PopoverContent>
            <Command>
                <CommandInput placeholder="Search Stack Network..." className="h-9" />
                <CommandEmpty>No version found.</CommandEmpty>
                <CommandGroup>
                    <CommandList
                        className="max-h-[256px]"
                    >
                        {[ChainID.STACKS, ChainID.STACKS_TESTNET].map((chainId: ChainID, index: any) => (
                            <CommandItem
                                className="hover:cursor-pointer"
                                key={index}
                                value={chainId || ""}
                                onSelect={(currentValue) => {
                                    if (chainId === STACKS_MAINNET.chainId.toString()) {
                                        setSelectedNetwork(STACKS_MAINNET)
                                    } else if (chainId === STACKS_TESTNET.chainId.toString()) {
                                        setSelectedNetwork(STACKS_TESTNET)
                                    } else {
                                        setSelectedNetwork(STACKS_MAINNET)
                                    }
                                    setValue(chainId)
                                    setOpen(false)
                                }}
                            >
                                {getNetworkNameFromChainID(chainId)}
                            </CommandItem>
                        ))}
                    </CommandList>
                </CommandGroup>
            </Command>
        </PopoverContent>
    </Popover>
}