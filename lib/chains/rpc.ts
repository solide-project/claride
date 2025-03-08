
import { ChainID } from "./chain-id"

const data: { [key: string]: string } = {
    [ChainID.STACKS_TESTNET]: "https://api.testnet.hiro.so",
    [ChainID.STACKS]: "https://api.mainnet.hiro.so",
}


export const getRPC = (network: string): string =>
    data[network] || ""
