import { ClarideIDE } from "@/components/clarinet/ide";
import { LoadContractPage } from "@/components/clarinet/load-contract";
import { ClarinetProvider } from "@/components/clarinet/clarinet-provider";
import { loadSampleProject, getClarinetContract } from "@/lib/server";

interface SearchParams {
  params: { slug: string }
  searchParams?: { [key: string]: string | undefined }
}
export default async function IndexPage({ searchParams }: SearchParams) {
  let url = ""
  searchParams?.url && (url = searchParams.url)

  let data = loadSampleProject()
  if (url) {
    data = await getClarinetContract(url)
  }

  if (typeof data === "string") return <LoadContractPage message={data} />

  return <ClarinetProvider>
    <ClarideIDE
      content={JSON.stringify(data)}
    />
  </ClarinetProvider>
}
