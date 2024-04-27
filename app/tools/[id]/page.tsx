
export default function ToolEnd({ params }: any) {
  const toolName = params.id

  return (
    <div className="pt-[20rem]">
      Hello from {toolName}
    </div>
  )
}
