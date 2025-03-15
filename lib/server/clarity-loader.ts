
import { ContractPaths, ContractDependency } from "@/lib/core"
import { fetchGithubAPI, fetchGithubSource, parseGitHubUrl } from "./utils"
import path from "path"

/**
 * Main function to get the contract source code
 * @param url
 * @returns
 */
export const getClarityContract = async (url: string) => {
    try {
        const loader = new ClarityLoader(url)
        return await loader.generateSourceClarity()
    } catch (e: any) {
        return e.message.toString()
    }
}

class ClarityLoader {
    source: string
    defaultTomlPath: string = "Clarinet.toml"
    constructor(source: string) {
        this.source = source
    }

    async generateSourceClarity(): Promise<any | string> {
        if (!this.source.endsWith(".clar")) {
            return "Invalid Clarity contract"
        }

        let sources: any = {}
        const parts = parseGitHubUrl(this.source)
        const fileName = path.basename(parts.path)
        const contractSource = await fetchGithubSource(this.source)
        const contractPath = `contracts/${fileName}`
        sources[contractPath] = { content: contractSource }

        const { name } = path.parse(parts.path)
        const tomlContent =
            `
[project]
name = '${name}'
description = ''
authors = []
telemetry = false
cache_dir = './.cache'
requirements = []

[contracts.${name}]
path = '${contractPath}'
clarity_version = 3
epoch = 3.1

[repl.analysis]
passes = ['check_checker']

[repl.analysis.check_checker]
strict = false
trusted_sender = false
trusted_caller = false
callee_filter = false
                    `.trim()
        sources[this.defaultTomlPath] = { content: tomlContent || "" }

        return {
            language: "Clarity",
            settings: {
            },
            sources: {
                ...sources,
            },
        }
    }
    async generateSource(): Promise<any | string> {
        const parts = parseGitHubUrl(this.source)
        const url = `https://api.github.com/repos/${parts.entity}/${parts.repo}/contents/${parts.path}`
        const content = await fetchGithubAPI(url)

        const tomlFile = content.find(i => i.name.toLocaleLowerCase() === "clarinet.toml" && i.type === "file")
        const tomlLockFile = content.find(i => i.name.toLocaleLowerCase() === "clarinet.lock" && i.type === "file")

        if (!tomlFile) {
            return "Invalid Clarinet Project"
        }

        const tomlContent = await fetchGithubSource(tomlFile?.html_url)
        const tomlSources = {
            [tomlFile.path]: {
                content: tomlContent,
            },
        }

        if (tomlLockFile?.html_url) {
            const tomlLockFileContent = await fetchGithubSource(tomlLockFile?.html_url)
            tomlSources[tomlLockFile?.path] = {
                content: tomlLockFileContent,
            }
        }

        let sources: any = {}

        return {
            language: "Clarity",
            settings: {
                compilationTarget: {
                    [tomlFile.path]: "Clarinet.toml"
                }
            },
            sources: {
                ...sources,
                ...tomlSources,
            },
        }
    }
}

async function loadSources(
    sources: string
): Promise<ContractDependency[]> {
    const files: ContractDependency[] = [];

    async function fetchContents(url: string): Promise<void> {
        const contents = await fetchGithubAPI(url)

        for (const item of contents) {
            if (item.type === 'file') {
                const source = await fetchGithubSource(item.download_url)
                files.push({
                    fileContents: source,
                    originalContents: source,
                    paths: new ContractPaths(item.path, ""),
                });
            } else if (item.type === 'dir') {
                await fetchContents(item.url);
            }
        }
    }

    await fetchContents(sources);
    return files;
}