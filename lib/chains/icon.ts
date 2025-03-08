import { ChainID } from "./chain-id"

export const getIconByChainId = (chainId: string): string =>
    `https://raw.githubusercontent.com/solide-project/icons/master/crypto/${getIcon(chainId)}`

const getIcon = (chainId: string): string => {
    switch (chainId) {
        case ChainID.STACKS_TESTNET:
        case ChainID.STACKS:
        default:
            return "eth.svg"
    }
}