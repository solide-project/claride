import { STACKS_MAINNET, STACKS_TESTNET, StacksNetwork } from '@stacks/network';

// export const useStacksNetwork = (): StacksNetwork => {
//     const selectedNetwork = useGlobalContext().activeNetwork;
//     const apiServer = selectedNetwork.url;
//     const networkMode = selectedNetwork.mode;
//     const Network = STACKS_TESTNET : STACKS_MAINNET;
//     const network = new Network({ url: apiServer, fetchFn: fetchWithApiKey });
//     return network;
// };