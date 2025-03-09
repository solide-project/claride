import { ClarideIDE } from "@/components/clarity/ide";
import { LoadContractPage } from "@/components/clarity/load-contract";
import { ClarityProvider } from "@/components/clarity/clarity-provider";
import { EthGetSourceCodeInterface, getSourceCode } from "@/lib/stacks/explorer";

export default async function Page({
  params,
}: {
  params: { chain: string; address: string }
}) {
  const data: EthGetSourceCodeInterface = await getSourceCode(
    params.chain,
    params.address
  )

  if (typeof data.result === "string")
    return <LoadContractPage message={`${data.result} ${JSON.stringify(data)}`} />

  return <ClarityProvider>
    <ClarideIDE
      url={params.address}
      chainId={params.chain}
      title={data.result[0].ContractName}
      content={data.result[0].SourceCode}
      version={data.result[0].CompilerVersion}
    />
  </ClarityProvider>
}
