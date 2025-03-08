import { StacksApiSocketClient } from '@stacks/blockchain-api-client';

function createConfig(stacksApiUrl: string) {
    // for testnet, replace with https://api.testnet.hiro.so
    const socketUrl = "https://api.mainnet.hiro.so";

    const client = new StacksApiSocketClient({ url: socketUrl });
}
