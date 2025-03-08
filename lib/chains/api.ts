import { ChainID } from "./chain-id"

const data: { [key: string]: string } = {
    [ChainID.STACKS_TESTNET]: "https://api.testnet.hiro.so",
    [ChainID.STACKS]: "https://api.hiro.so",
}

export const getAPI = (network: string): string =>
    data[network] || ""