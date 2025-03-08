import { ISmartContract, InvokeParam } from "./interfaces"
import { getAPI } from "../chains/api"
import { request } from "@stacks/connect"
import { Cl, ClarityAbiFunction, ClarityType, ClarityValue, cvToHex, hexToCV, parseContractId } from "@stacks/transactions"
import { STACKS_MAINNET, STACKS_TESTNET, StacksNetwork } from "@stacks/network";
import { ChainID } from "../chains";
import {
  Configuration,
  SmartContractsApiInterface,
  SmartContractsApi,
  ReadOnlyFunctionSuccessResponse,
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
      basePath: 'https://api.testnet.hiro.so',
    });

    const contractsApi: SmartContractsApiInterface = new SmartContractsApi(apiConfig);

    // use most recent from: https://api.<mainnet/testnet>.hiro.so/v2/pox
    const rewardCycle = Cl.uint(22);

    console.log(contractsApi)
    console.log({
      contractAddress: principal,
      contractName: name,
      functionName: method,
      readOnlyFunctionArgs: {
        sender: principal,
        arguments: args.map((x: ClarityValue) => cvToHex(x)),
      },
    })
    // call a read-only function
    const fnCall: ReadOnlyFunctionSuccessResponse = await contractsApi.callReadOnlyFunction({
      contractAddress: principal,
      contractName: name,
      functionName: method,
      readOnlyFunctionArgs: {
        sender: principal,
        arguments: args.map((x: ClarityValue) => cvToHex(x)),
      },
    });

    console.log({
      status: fnCall.okay,
      result: fnCall.result,
      representation: hexToCV(fnCall.result || "").type.toString(),
    });
    // // const args = functionArgs.map(arg => cvToHex(arg));

    // // const body = JSON.stringify({
    // //   sender: senderAddress,
    // //   arguments: args,
    // // });
    // const body = JSON.stringify({
    //   "sender": "ST343Q482FS7E64MMQFVZ3XDDY8Y89KYWSXBXQNG9",
    //   "arguments": [
    //     "0x051ac83b91027e4ee31294bbf7f1f5adf23c84cfdccf"
    //   ]
    // });

    // const opts: any = {
    //   method: "POST",
    //   headers: headers(),
    //   body,
    //   redirect: "follow"
    // };

    // const response = await fetch(`${url}/call-read/${address}/${name}/${encodeURIComponent(method)}`, opts);

    // return response.json();
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
    const response = await request('stx_callContract', {
      contract: this.contractAddress,
      functionName: method,
      functionArgs: args,
      network: 'testnet',
    });

    console.log(response)
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