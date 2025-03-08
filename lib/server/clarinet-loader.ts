
import { ContractPaths, ContractDependency } from "@/lib/core"
import { fetchGithubAPI, fetchGithubSource, parseGitHubUrl } from "./utils"
import path from "path"

/**
 * Main function to get the contract source code
 * @param url
 * @returns
 */
export const getClarinetContract = async (url: string) => {
    try {
        const loader = new ClarinetLoader(url)
        return await loader.generateSource()
    } catch (e: any) {
        return e.message.toString()
    }
}

class ClarinetLoader {
    source: string
    constructor(source: string) {
        this.source = source
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

        let dependencies: ContractDependency[] = []
        let sources: any = {}
        // try {
        //     dependencies = await loadSources(sourcesFolder?.url)
        //     dependencies.forEach((dependency) => {
        //         const { paths, originalContents } = dependency
        //         const sourceKey = paths.isHttp() ? paths.folderPath : paths.filePath
        //         sources[sourceKey] = { content: originalContents || "" }
        //     })
        // } catch (error: any) {
        //     return "Error loading dependencies"
        // }

        return {
            language: "Clarinet",
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