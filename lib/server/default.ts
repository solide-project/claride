import fs from 'fs';
import path from 'path';

export const loadFile = (source: string): string => {
    const wasmDirectory = path.resolve('./public/sample', source);
    return fs.readFileSync(wasmDirectory).toString();
}

export const loadSampleProject = () => {
    const tomlPath = 'Clarinet.toml'
    const contractPath = 'contracts/main.clar'

    return {
        sources: {
            [tomlPath]: { content: loadFile(tomlPath) },
            [contractPath]: { content: loadFile(contractPath) },
        }
    }
}