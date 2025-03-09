"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ConsoleLogger } from "@/components/core/console"
import { IDE } from "@/components/core/ide"
import { IDEHeader } from "@/components/core/ide-header"
import { useEditor } from "@/components/core/providers/editor-provider"
import { useFileSystem } from "@/components/core/providers/file-provider"
import { useLogger } from "@/components/core/providers/logger-provider"
import {
    CODE_KEY,
    CONSOLE_KEY,
    EDITOR_KEY,
    FILE_KEY,
    useNav,
} from "@/components/core/providers/navbar-provider"
import { BuildDeploy } from "@/components/clarity/deploy/build-deploy"
import { CompiledContract, useClarity } from "@/components/clarity/clarity-provider"
import { ClarityNavBar } from "@/components/clarity/navbar/navbar"
import { QueryHelper } from "@/lib/core"
import { CompileInput, parseInput } from "@/lib/stacks/input"
import { CompileError } from "@/lib/stacks/error"
import { FileTree } from "@/components/core/file/file-tree"
import * as toml from '@ltd/j-toml'
import { CONTRACT_KEY } from "./navbar/nav-item-user-contracts"
import { ContractHistory } from "./contract/contract-history"

export const hexToDecimal = (hex: string): number => parseInt(hex, 16)

interface ClarideIDEProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Entire GitHub URL or an contract address
     */
    url?: string
    /**
     * Chain ID of contract address, should only be used when smart contract is address
     */
    chainId?: string
    title?: string
    content: string
    version?: string
}

export function ClarideIDE({
    url,
    chainId,
    title,
    content,
    version,
}: ClarideIDEProps) {
    const fs = useFileSystem()
    const ide = useEditor()
    const logger = useLogger()
    const clarity = useClarity()

    const { setNavItemActive, isNavItemActive } = useNav()

    React.useEffect(() => {
        ; (async () => {
            setNavItemActive(EDITOR_KEY, true)
            setNavItemActive(FILE_KEY, true)
            setNavItemActive(CONSOLE_KEY, true)

            fs.vfs.clear()
            
            let input: CompileInput = parseInput(content)
            const entry = Object.keys(input.settings?.compilationTarget || [])
                .filter(i => i.toLocaleLowerCase().includes("clarinet.toml"))
                .pop()
            if (entry) {
                clarity.setTomlPath(entry)
            }

            const entryFile = await fs.initAndFoundEntry(input.sources, title || "Clarinet.toml")
            if (entryFile) {
                ide.selectFile(entryFile)
            }

            logger.info("Welcome to Claride IDE")
        })()
    }, [])

    const [compiling, setCompiling] = React.useState<boolean>(false)
    const handleCompile = async () => {
        try {
            const start = performance.now()
            logger.info("Compiling ...")
            setCompiling(true)

            await doCompile()

            const end = performance.now()
            logger.success(`Compiled in ${end - start} ms.`)

            setNavItemActive(CODE_KEY, true)
        } catch (error: any) {
            logger.error(error.message)
        } finally {
            setCompiling(false)
        }
    }

    const doCompile = async () => {
        clarity.resetBuild()
        let queryBuilder = new QueryHelper()

        if (clarity.tomlPath) {
            queryBuilder = queryBuilder.addParam("toml", clarity.tomlPath)
        }

        const sources = fs.generateSources()
        const source: any = { sources }
        const body = { input: source }

        const response = await fetch(`/api/compile${queryBuilder.build()}`, {
            method: "POST",
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            const data = (await response.json()) as CompileError
            clarity.setErrors(data)

            logger.error(`Compiled with ${data.details.length} errors.`, true)
            return
        }

        // Compile Success
        const data = await response.json()
        const logs: string[] = data.details
        console.log(logs.join("\n"))
        logger.info(<>
            {logs.map((log, index) => {
                return (
                    <div key={index}>
                        {log} <br />
                    </div>
                )
            })}
        </>)

        // Create list of compiled contract
        const file = fs.vfs.cat(clarity.tomlPath || "Clarinet.toml")
        const tomlContent = toml.parse(file.content)

        const contracts: CompiledContract[] = []
        Object.entries(tomlContent["contracts"] as any).forEach(([item, val]: any) => {
            const contract = fs.vfs.cat(val.path)
            contracts.push({
                filePath: item,
                content: contract.content,
            })
        })
        clarity.setCompiledContracts(contracts)
    }

    return <div className="min-w-screen max-w-screen flex max-h-screen min-h-screen">
        <div className="py-2 pl-2">
            <ClarityNavBar url={""} />
        </div>
        <ResizablePanelGroup
            direction="horizontal"
            className="min-w-screen max-w-screen max-h-screen min-h-screen"
        >
            <ResizablePanel
                defaultSize={30}
                minSize={25}
                className={cn({
                    hidden: !(isNavItemActive(FILE_KEY) || isNavItemActive(CODE_KEY)),
                })}
            >
                <div className="flex max-h-screen w-full flex-col gap-y-2 overflow-y-auto p-2">
                    {isNavItemActive(FILE_KEY) && (
                        <FileTree className="rounded-lg bg-grayscale-025 pb-4" />
                    )}
                    {isNavItemActive(CODE_KEY) && (
                        <BuildDeploy className="rounded-lg bg-grayscale-025" />
                    )}
                    {isNavItemActive(CONTRACT_KEY) && (
                        <ContractHistory className="rounded-lg bg-grayscale-025" />
                    )}
                </div>
            </ResizablePanel>
            {(isNavItemActive(FILE_KEY) || isNavItemActive(CODE_KEY)) && (
                <ResizableHandle withHandle />
            )}
            <ResizablePanel defaultSize={70} minSize={5}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel
                        defaultSize={75}
                        minSize={5}
                        className={cn("relative", {
                            hidden: !isNavItemActive(EDITOR_KEY),
                        })}
                    >
                        {isNavItemActive(EDITOR_KEY) && (
                            <>
                                <IDEHeader />
                                <IDE />
                                <Button
                                    className="absolute"
                                    style={{ bottom: "16px", right: "16px" }}
                                    size="sm"
                                    onClick={handleCompile}
                                    disabled={compiling}
                                >
                                    {compiling ? "Compiling ..." : "Compile"}
                                </Button>
                            </>
                        )}
                    </ResizablePanel>
                    {isNavItemActive(EDITOR_KEY) && isNavItemActive(CONSOLE_KEY) && (
                        <ResizableHandle withHandle />
                    )}
                    <ResizablePanel
                        defaultSize={25}
                        minSize={5}
                        className={cn(
                            "m-2 !overflow-y-auto rounded-lg bg-grayscale-025",
                            { hidden: !isNavItemActive(CONSOLE_KEY) }
                        )}
                    >
                        <ConsoleLogger className="p-3" />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
}