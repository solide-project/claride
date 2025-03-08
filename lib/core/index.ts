/**
 * Dependencies
 * - jszip
 */
export { isVFSFile } from "./file-system/interfaces"
export type { VFSFile, Sources, VFSNode } from "./file-system/interfaces"

export { zipSources, downloadBlob } from "./deps/downloader"
export * from "./utils/query"
export * from "./utils/paths"
export * from "./utils/contract-dependency"
