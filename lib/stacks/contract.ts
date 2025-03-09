import { ISmartContract, InvokeParam } from "./interfaces"
import { getAPI } from "../chains/api"
import { FinishedTxData, openContractCall, request } from "@stacks/connect"
import { Cl, ClarityAbiFunction, ClarityType, ClarityValue, cvToHex, hexToCV, parseContractId } from "@stacks/transactions"
import { STACKS_MAINNET, STACKS_TESTNET, StacksNetwork } from "@stacks/network";
import { ChainID } from "../chains";
import {
  Configuration,
  SmartContractsApiInterface,
  SmartContractsApi,
  ReadOnlyFunctionSuccessResponse,
  TransactionsApi,
  TransactionsApiInterface,
} from '@stacks/blockchain-api-client';

interface ReadOnlyOptions {
  senderAddress: string;
  contractName: string;
  contractAddress: string;
  functionName: string;
  functionArgs: ClarityValue[];
  network: StacksNetwork;
}

const data: { [key: string]: string } = {
  [ChainID.STACKS_TESTNET]: "https://api.testnet.hiro.so/v2/contracts",
  [ChainID.STACKS]: "https://api.hiro.so/v2/contracts",
}

export const getContractAPI = (network: string): string =>
  data[network] || ""

export class StacksSmartContract implements ISmartContract {
  contractAddress: `${string}.${string}`
  chainId: any
  network: StacksNetwork

  data: any
  abi: {
    functions: ClarityAbiFunction[]
  }

  constructor(address: string, chainId: string) {
    this.contractAddress = address as `${string}.${string}`;
    this.chainId = chainId;
    this.network = STACKS_MAINNET
    if (chainId === ChainID.STACKS) {
      this.network = STACKS_MAINNET
    } else if (chainId === ChainID.STACKS_TESTNET) {
      this.network = STACKS_TESTNET
    }

    this.data = {};
    this.abi = { functions: [] };
  }

  async init() {
    const basePath = getAPI(this.chainId)
    const apiConfig: Configuration = new Configuration({
      fetchApi: fetch,
      basePath,
      apiKey: process.env.API_KEY
    });

    const contractsApi: SmartContractsApiInterface = new SmartContractsApi(apiConfig);
    const data = await contractsApi.getContractById({ contractId: this.contractAddress })
    this.data = data
    this.abi = JSON.parse(data.abi);
  }

  async call({ method, args }: InvokeParam): Promise<any> {
    const [principal, name] = parseContractId(this.contractAddress)

    // Docs: https://github.com/hirosystems/stacks-blockchain-api/blob/9ce9a3311a5ad80028a83eeb89aba27d65d0f8df/content/feature-guides/use-clarity-values.md
    const apiConfig: Configuration = new Configuration({
      fetchApi: fetch,
      basePath: getAPI(this.chainId),
    });

    const contractsApi: SmartContractsApiInterface = new SmartContractsApi(apiConfig);

    const fnCall: ReadOnlyFunctionSuccessResponse = await contractsApi.callReadOnlyFunction({
      contractAddress: principal,
      contractName: name,
      functionName: method,
      readOnlyFunctionArgs: {
        sender: principal,
        arguments: args.map((x: ClarityValue) => cvToHex(x)),
      },
    });

    return fnCall
  }

  /**
   * value in wei
   */
  async send({
    method,
    args,
    value = "0",
    // gas = "1000000",
  }: InvokeParam): Promise<any> {
    console.log({
      contract: this.contractAddress,
      functionName: method,
      functionArgs: args,
      network: 'testnet',
    })
    // const response = await request('stx_callContract', {
    //   contract: this.contractAddress,
    //   functionName: method,
    //   functionArgs: args,
    //   network: 'testnet',
    // });
    // console.log(response)

    const [contractAddress, contractName] = parseContractId(this.contractAddress)

    console.log({
      contractAddress,
      contractName,
      functionName: encodeURIComponent(method),
      functionArgs: args,
      network: this.network,
      // authOrigin: CONNECT_AUTH_ORIGIN,
      onFinish: (data: FinishedTxData) => {
        console.log(data)
      },
      // postConditions:
      //   values.postConditionMode === PostConditionMode.Allow
      //     ? undefined
      //     : getPostCondition({
      //       postConditionType,
      //       postConditionAddress,
      //       postConditionConditionCode,
      //       postConditionAmount,
      //       postConditionAssetAddress,
      //       postConditionAssetContractName,
      //       postConditionAssetName,
      //     }),
      // postConditionMode,
    })
    openContractCall({
      contractAddress,
      contractName,
      functionName: encodeURIComponent(method),
      functionArgs: args,
      network: this.network,
      // authOrigin: CONNECT_AUTH_ORIGIN,
      onFinish: (data: FinishedTxData) => {
        console.log(data)
      },
      // postConditions:
      //   values.postConditionMode === PostConditionMode.Allow
      //     ? undefined
      //     : getPostCondition({
      //       postConditionType,
      //       postConditionAddress,
      //       postConditionConditionCode,
      //       postConditionAmount,
      //       postConditionAssetAddress,
      //       postConditionAssetContractName,
      //       postConditionAssetName,
      //     }),
      // postConditionMode,
    });
  }
}


const headers = () => {
  const headers = new Headers();
  headers.append("accept", "*/*");
  headers.append("accept-language", "en-US,en;q=0.5");
  headers.append("cache-control", "no-cache");
  headers.append("content-type", "application/json");
  // headers.append("origin", "https://explorer.hiro.so");
  headers.append("pragma", "no-cache");
  headers.append("priority", "u=1, i");
  // headers.append("referer", "https://explorer.hiro.so/");
  headers.append("x-api-key", "e03338a5c9db1483abdddf1bcaaee55b");
  return headers
}