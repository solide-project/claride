"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { useClarity } from "../clarity-provider"


interface SelectContractProps extends React.HTMLAttributes<HTMLDivElement> { }

export function SelectContract({ className }: SelectContractProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const { selectedContract, setSelectedContract, compiledContracts } = useClarity()

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between capitalize"
                >
                    {selectedContract?.filePath || "Select Contract"}
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {compiledContracts.map((contract, index) => {
                                return (
                                    <CommandItem
                                        key={index}
                                        value={contract.filePath}
                                        onSelect={(val: string) => {
                                            setValue(contract.filePath)
                                            setSelectedContract(contract)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 size-4",
                                                value === contract.filePath ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {contract.filePath}
                                    </CommandItem>
                                )
                            })}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}