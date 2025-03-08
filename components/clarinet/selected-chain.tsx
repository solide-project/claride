"use client"

import * as React from "react"
import { useEffect, useState } from "react"

import { ChainID, getIconByChainId, getNetworkNameFromChainID } from "@/lib/chains"

import { SelectedChain } from "@/components/core/components/selected-chain"
import { useClarinet } from "./clarinet-provider"

export const hexToDecimal = (hex: string): number => parseInt(hex, 16)
export const hexToString = (hex: string): string => hexToDecimal(hex).toString()

interface ClarinetSelectedChainProps extends React.HTMLAttributes<HTMLDivElement> { }

const chains = Object.entries(ChainID)
    .map((value) => value[1]) as string[]

export function ClarinetSelectedChain({ }: ClarinetSelectedChainProps) {
    const { selectedNetwork } = useClarinet()

    return <>
        <SelectedChain
            name={getNetworkNameFromChainID(selectedNetwork.chainId.toString())}
            src={getIconByChainId(selectedNetwork.chainId.toString())} />
    </>
}