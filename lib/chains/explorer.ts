import { ChainID } from "./chain-id"

const data: { [key: string]: string } = {
    [ChainID.STACKS_TESTNET]: "?chain=testnet",
    [ChainID.STACKS]: "?chain=mainnet",
}
const explorerUrl = "https://explorer.hiro.so"

export const getExplorer = (network: string): string => data[network] || ""

export const getAddressExplorer = (network: string, contract: string): string => {
    const explorer = getExplorer(network)
    let addressPath = ""

    switch (network) {
        default:
            addressPath = `address/${contract}${explorer}`
            break
    }

    return `${explorerUrl}/${addressPath}`
}

export const getTransactionExplorer = (network: string, tx: string): string => {
    const explorer = getExplorer(network)
    let addressPath = ""

    switch (network) {
        default:
            addressPath = `txid/${tx}${explorer}`
            break
    }

    return `${explorerUrl}/${addressPath}`
}
