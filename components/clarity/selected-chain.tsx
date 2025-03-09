"use client"

import * as React from "react"

import { getIconByChainId, getNetworkNameFromChainID } from "@/lib/chains"

import { SelectedChain } from "@/components/core/components/selected-chain"
import { useClarity } from "./clarity-provider"

export const hexToDecimal = (hex: string): number => parseInt(hex, 16)
export const hexToString = (hex: string): string => hexToDecimal(hex).toString()

interface ClaritySelectedChainProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ClaritySelectedChain({ }: ClaritySelectedChainProps) {
    const { selectedNetwork } = useClarity()

    return <>
        <SelectedChain
            name={getNetworkNameFromChainID(selectedNetwork.chainId.toString())}
            src={getIconByChainId(selectedNetwork.chainId.toString())} />
    </>
}