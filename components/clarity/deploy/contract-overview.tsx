"use client"

import * as React from "react"

import { useClarity } from "@/components/clarity/clarity-provider"
import { useLogger } from "@/components/core/providers/logger-provider";

interface ContractOverviewProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ContractOverview({ }: ContractOverviewProps) {
    const clarity = useClarity();
    const logger = useLogger();

    return <div className="h-full overflow-y-auto px-4">
        Contract Info
    </div>
}