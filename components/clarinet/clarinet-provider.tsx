"use client"

import { CompileError } from "@/lib/stacks/error"
import { STACKS_MAINNET, StacksNetwork } from "@stacks/network"
import { error } from "console"
import React, { createContext, useContext, useState } from "react"


export const ClarinetProvider = ({ children }: ClarinetProviderProps) => {
    const [tomlPath, setTomlPath] = useState<string>("")
    const [errors, setErrors] = useState<CompileError>({} as CompileError)
    const [selectedNetwork, setSelectedNetwork] = useState<StacksNetwork>(STACKS_MAINNET)

    const resetBuild = () => {
        setErrors({} as CompileError)
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
    setErrors: (errors: CompileError) => { },
    resetBuild: () => { },
    tomlPath: "",
    setTomlPath: (path: string) => { },
    selectedNetwork: STACKS_MAINNET,
    setSelectedNetwork: (path: StacksNetwork) => { },
})

export const useClarinet = () => useContext(ClarinetContext)