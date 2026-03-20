export default function PageContainer({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-5xl">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {title}
        </h1>

        {children}

      </div>
    </main>
  )
}