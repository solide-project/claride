import { Buffer } from 'buffer';
import { resolve } from 'path';

export class VirtualFileSystem {
    root: string = "";
    overwrites: Map<string, Buffer> = new Map();
    files: Map<string, Buffer> = new Map();

    resolve(...path: string[]): string {
        // return normalize(resolve(this.root, ...path));
        return resolve(...path);
    }

    exists(path: string): boolean {
        const resolvedPath = this.resolve(path);
        return this.files.has(resolvedPath) || this.overwrites.has(resolvedPath);
    }

    readFile(path: string): Buffer {
        const resolvedPath = this.resolve(path);
        console.log(resolvedPath);
        return (this.overwrites.get(resolvedPath) ??
            this.files.get(resolvedPath) ??
            Buffer.from(''));
    }

    writeContractFile(path: string, content: string | Buffer): void {
        this.files.set(path, typeof content === 'string' ? Buffer.from(content, 'utf-8') : content);
    }

    writeFile(path: string, content: string | Buffer): void {
        this.overwrites.set(path, typeof content === 'string' ? Buffer.from(content, 'utf-8') : content);
    }
}