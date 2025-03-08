import { ChainID } from "./chain-id"

const data: { [key: string]: string } = {
    [ChainID.STACKS_TESTNET]: "Stacks Testnet",
    [ChainID.STACKS]: "Stacks Mainnet",
}

export const getNetworkNameFromChainID = (network: string): string =>
    data[network] || ""