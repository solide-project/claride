import { execSync } from "child_process";
import stripAnsi from "strip-ansi";
import { cargoFileLower } from "./constants";

export const compile = async (sourcePath: string, toml: string = "", packageName: string = "", contractPath: string = "") => {
    if (toml.startsWith("/")) {
        toml = toml.slice(1);
    }
    if (toml.toLocaleLowerCase().endsWith(`/${cargoFileLower}`)) {
        toml = toml.slice(0, -9);
    }

    console.log(`cd ${sourcePath} && \
        clarinet check -m ${toml}
        `)
    const compiledModules = execSync(
        `cd ${sourcePath} && \
            clarinet check -m ${toml}
            `,
        {
            encoding: 'utf-8',
            // stdio: ['pipe', 'pipe', 'ignore'] 
        }
    ).split("\n");

    const data = getItemsBeforeSeparator(compiledModules)

    // console.log(data)
    return data.filter(x => x !== "")
}

function getItemsBeforeSeparator(arr: string[]): string[] {
    const separatorIndex = arr.indexOf('----------------------------');
    if (separatorIndex === -1) {
      return []; // Separator not found
    }
    return arr.slice(0, separatorIndex);
  }