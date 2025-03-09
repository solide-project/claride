import path from "path"
import fs from "fs"
import { NextRequest, NextResponse } from "next/server"
import { compile } from "@/lib/stacks/compiler";
import stripAnsi from "strip-ansi";
import toml from "toml";
import JSZip from "jszip";
import { loadFile } from "@/lib/server/default";

export async function POST(request: NextRequest) {
    if (!process.env.PROJECT_PATH) {
        return NextResponseError("Server Side Error");
    }

    let tomlPath = request.nextUrl.searchParams.get("toml") || ""
    let contractPath = request.nextUrl.searchParams.get("contract") || ""

    const { input } = await request.json();
    const { sources } = input;

    const projectPath = process.env.PROJECT_PATH;
    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath, { recursive: true });
    }

    const id = crypto.randomUUID();
    const mainDir = `${projectPath}/${id}`;
    fs.mkdirSync(mainDir, { recursive: true });

    Object.keys(sources).forEach((sourcePath) => {
        const sourceContent = sources[sourcePath].content;
        const { dir, base } = path.parse(sourcePath);

        const targetDir = path.join(mainDir, dir);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        const filePath = path.join(targetDir, base);
        fs.writeFileSync(filePath, sourceContent);
    });

    // Store and overwrite the setting tomls
    ["settings/Devnet.toml", "settings/Mainnet.toml", "settings/Testnet.toml"].forEach((sourcePath) => {
        const sourceContent = loadFile(sourcePath)
        const { dir, base } = path.parse(sourcePath);

        const targetDir = path.join(mainDir, dir);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        const filePath = path.join(targetDir, base);
        fs.writeFileSync(filePath, sourceContent);
    });

    try {
        if (tomlPath.startsWith("/")) {
            tomlPath = tomlPath.slice(1);
        }
        if (!tomlPath.toLocaleLowerCase().endsWith("/clarinet.toml")) {
            tomlPath = path.join(tomlPath, "Clarinet.toml");
        }

        var data = toml.parse(fs.readFileSync(path.join(mainDir, tomlPath)).toString());
        if (!data.project.name) {
            throw new Error("Project name not found in Clarinet.toml");
        }

        const { dir } = path.parse(tomlPath);
        const sourcePath = path.join(mainDir, dir)
        console.log("Compiling", data.project.name, sourcePath, contractPath)
        const output = await compile(sourcePath, tomlPath, data.project.name, contractPath);

        fs.rmSync(mainDir, { recursive: true });

        return NextResponse.json(
            {
                details: output,
            },
        )

    } catch (error: any) {
        console.log('error', error)
        let errorMessage: string = stripAnsi(error.stderr || error.stdout || error.message || "Internal error while compiling.");

        fs.rmSync(mainDir, { recursive: true });

        return NextResponseError(errorMessage);
    }
}

const NextResponseError = (...messages: string[]) =>
    NextResponse.json(
        {
            details: messages.map((msg) => ({
                component: "custom",
                errorCode: "0",
                formattedMessage: msg,
                message: "Internal error while compiling.",
                severity: "error",
                sourceLocation: [],
                type: "CustomError",
            })),
        },
        { status: 400 }
    )