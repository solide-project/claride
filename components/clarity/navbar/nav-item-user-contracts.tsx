"use client"

import { FileStack, UtilityPole } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNav } from "@/components/core/providers/navbar-provider"

interface NavItemUserContractsProps
    extends React.HTMLAttributes<HTMLButtonElement> {
}

export const CONTRACT_KEY = "user-contract"

export function NavItemUserContracts({
    ...props
}: NavItemUserContractsProps) {
    const { isNavItemActive, setNavItemActive } = useNav()

    const handleOnClick = async (event: any) => {
        setNavItemActive(CONTRACT_KEY)
        props.onClick && props.onClick(event)
    }

    return <Button
        className="cursor-pointer border-0 hover:bg-grayscale-100"
        size="icon"
        variant="ghost"
        onClick={handleOnClick}
        {...props}
    >
        <FileStack
            className={isNavItemActive(CONTRACT_KEY) ? "" : "text-grayscale-250"}
        />
    </Button>
}