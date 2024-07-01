import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `Toolhance | ${params.id}`,
    description: "Contact Toolhance's team here!",
  }
}

export default function ToolEnd({ params }: any) {
  const toolName = params.id

  return (
    <div className="pt-[20rem]">
      Hello from {toolName}
    </div>
  )
}
