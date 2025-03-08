"use client"

import { NavItemCode } from "@/components/core/navbar/nav-item-code"
import { NavItemContent } from "@/components/core/navbar/nav-item-content"
import { NavItemEditor } from "@/components/core/navbar/nav-item-editor"
import { NavItemFile } from "@/components/core/navbar/nav-item-file"
import { NavItemTheme } from "@/components/core/navbar/nav-item-theme"

import { NavItemConsole } from "@/components/core/navbar/nav-item-console"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ClarinetSettings } from "@/components/clarinet/settings/settings"
import { NavItemDownloader } from "@/components/clarinet/navbar/nav-item-downloader"
import { SelectedNetwork } from "@/components/clarinet/navbar/selected-network"
import { ClarinetSelectedChain } from "../selected-chain"
import { NavItemLoader } from "./nav-item-loader"

interface ClarinetNavBarProps extends React.HTMLAttributes<HTMLDivElement> {
    url: string,
}

export function ClarinetNavBar({
    url,
}: ClarinetNavBarProps) {
    return (
        <div className="flex h-full flex-col gap-y-2 rounded-lg bg-grayscale-025 px-2 py-4">
            <NavTooltipItem tooltip="File Explorer">
                <NavItemFile />
            </NavTooltipItem>
            <NavTooltipItem tooltip="Build & Deploy">
                <NavItemCode />
            </NavTooltipItem>
            <NavTooltipItem tooltip="Editor">
                <NavItemEditor />
            </NavTooltipItem>
            <NavTooltipItem tooltip="Console">
                <NavItemConsole />
            </NavTooltipItem>
            <NavTooltipItem tooltip="Download Smart Contract">
                <NavItemDownloader />
            </NavTooltipItem>
            <NavTooltipItem tooltip="Load New Contract">
                <NavItemLoader />
            </NavTooltipItem>

            <div className="mt-auto flex flex-col items-center gap-2">
                <ClarinetSelectedChain />
                <NavItemTheme />
                <ClarinetSettings />
            </div>
        </div>
    )
}

const NavTooltipItem = ({ children, tooltip }: { children: React.ReactNode, tooltip: string }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild={true}>
                <div>
                    {children}
                </div>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    )
}