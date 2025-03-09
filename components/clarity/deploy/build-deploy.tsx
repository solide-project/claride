"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

import { Title } from "@/components/core/components/title"
import { useClarity } from "@/components/clarity/clarity-provider"
import { ContractInvoke } from "@/components/clarity/deploy/contract-invoke"
import { CompileErrors } from "@/components/clarity/deploy/compile-errors"
import { ContractOverview } from "@/components/clarity/deploy/contract-overview"

interface BuildDeployProps extends React.HTMLAttributes<HTMLDivElement> { }

enum Tab {
    OVERVIEW = "overview",
    INTERACT = "interact",
}

export function BuildDeploy({ className }: BuildDeployProps) {
    const clarity = useClarity()

    const [activeTab, setActiveTab] = useState<Tab>(Tab.INTERACT)
    const isActive = (tab: string) => activeTab === tab

    const tabActive = (tab: string): string =>
        cn("cursor-pointer", {
            "text-grayscale-250": !isActive(tab),
            "bg-grayscale-200 rounded-lg px-3 py-1": isActive(tab),
        })

    return (
        <div className={cn("px-2 pb-4", className)}>
            <Title text="Build & Deploy" />

            {clarity.errors && clarity.errors.details && <CompileErrors />}

            <div className="mx-2 my-4 flex items-center gap-x-4 text-sm">
                <div
                    className={tabActive(Tab.OVERVIEW)}
                    onClick={() => setActiveTab(Tab.OVERVIEW)}
                >
                    Overview
                </div>
                <div
                    className={tabActive(Tab.INTERACT)}
                    onClick={() => setActiveTab(Tab.INTERACT)}
                >
                    Contract
                </div>
            </div>

            {isActive(Tab.OVERVIEW) && <ContractOverview />}

            {isActive(Tab.INTERACT) &&
                <ContractInvoke />}

        </div>
    )
}