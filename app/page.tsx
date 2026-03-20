import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">

      <h1 className="text-4xl font-bold mb-6">
        💰 Simulador Financeiro
      </h1>

      <p className="mb-6 text-gray-700">
        Controle suas despesas e simule investimentos de forma simples.
      </p>

      <div className="flex gap-4">
        <Link href="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded">
          Dashboard
        </Link>

        <Link href="/investimentos" className="bg-green-500 text-white px-4 py-2 rounded">
          Investimentos
        </Link>
      </div>

    </main>
  )
}