"use client"

import Image from "next/image"
import * as React from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { cn } from "@/lib/utils";

export const hexToDecimal = (hex: string): number => parseInt(hex, 16)

interface SelectedNetworkProps extends React.HTMLAttributes<HTMLDivElement> { }

export function SelectedNetwork({ }: SelectedNetworkProps) {

    const getIconById = (network: string) => {
        switch (network) {
            case "m2":
                return "/icons/movement.svg";
            default:
                return "/icons/sui.svg";
        }
    }

    return <HoverCard>
        <HoverCardTrigger>
            <Image
                width={50}
                height={50}
                alt={"Fuel Network"}
                src={"/icon/fuel.svg"}
                className={cn(
                    buttonVariants({ size: "icon", variant: "link" }),
                    "h-5 w-5 cursor-pointer sm:h-8 sm:w-8"
                )}
            />
        </HoverCardTrigger>
        <HoverCardContent>
            {/* {getNetworkName()} */}
            {"Fuel Network"}
        </HoverCardContent>
    </HoverCard>
}