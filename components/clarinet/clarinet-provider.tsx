"use client"

import { CompileError } from "@/lib/stacks/error"
import { STACKS_MAINNET, StacksNetwork } from "@stacks/network"
import React, { createContext, useContext, useState } from "react"

export interface CompiledContract {
    filePath: string,
    content: string
}

export const ClarinetProvider = ({ children }: ClarinetProviderProps) => {
    const [tomlPath, setTomlPath] = useState<string>("")
    const [errors, setErrors] = useState<CompileError>({} as CompileError)
    const [selectedNetwork, setSelectedNetwork] = useState<StacksNetwork>(STACKS_MAINNET)
    const [selectedContract, setSelectedContract] = useState<CompiledContract | undefined>(undefined)

    /**
     * This of the contract. We save a snapshot of the contract content in case they change on IDE
     */
    const [compiledContracts, setCompiledContracts] = useState<CompiledContract[]>([])

    const resetBuild = () => {
        setErrors({} as CompileError)
        setCompiledContracts([])
    }

    return (
        <ClarinetContext.Provider
            value={{
                errors,
                setErrors,
                resetBuild,
                tomlPath,
                setTomlPath,
                selectedNetwork,
                setSelectedNetwork,
                compiledContracts,
                setCompiledContracts,
                selectedContract,
                setSelectedContract,
            }}
        >
            {children}
        </ClarinetContext.Provider>
    )
}

interface ClarinetProviderProps extends React.HTMLAttributes<HTMLDivElement> {
    name?: string
}

export const ClarinetContext = createContext({
    errors: {} as CompileError,
    setErrors: (_: CompileError) => { },
    resetBuild: () => { },
    tomlPath: "",
    setTomlPath: (_: string) => { },
    selectedNetwork: STACKS_MAINNET,
    setSelectedNetwork: (_: StacksNetwork) => { },
    compiledContracts: [] as CompiledContract[],
    setCompiledContracts: (_: CompiledContract[]) => { },
    selectedContract: {} as CompiledContract | undefined,
    setSelectedContract: (_: CompiledContract | undefined) => { },
})

export const useClarinet = () => useContext(ClarinetContext)