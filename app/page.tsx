import { ClarideIDE } from "@/components/clarity/ide";
import { LoadContractPage } from "@/components/clarity/load-contract";
import { ClarityProvider } from "@/components/clarity/clarity-provider";
import { loadSampleProject, getClarityContract } from "@/lib/server";

interface SearchParams {
  params: { slug: string }
  searchParams?: { [key: string]: string | undefined }
}
export default async function IndexPage({ searchParams }: SearchParams) {
  let url = ""
  searchParams?.url && (url = searchParams.url)

  let data = loadSampleProject()
  if (url) {
    data = await getClarityContract(url)
  }

  if (typeof data === "string") return <LoadContractPage message={data} />

  return <ClarityProvider>
    <ClarideIDE
      content={JSON.stringify(data)}
    />
  </ClarityProvider>
}
