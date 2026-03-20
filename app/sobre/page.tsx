import PageContainer from "@/components/PageContainer"

export default function Sobre() {
  return (
    <PageContainer title="Sobre">

      <div className="space-y-6">

        {/* Card principal */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">
            💰 Controle Financeiro
          </h2>
          <p className="text-sm opacity-90">
            Um aplicativo simples para organizar gastos, acompanhar metas e visualizar sua vida financeira.
          </p>
        </div>

        {/* Funcionalidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="bg-white p-4 rounded-xl shadow hover:scale-[1.02] transition">
            <p className="text-2xl mb-1">📊</p>
            <h3 className="font-semibold">Dashboard</h3>
            <p className="text-sm text-gray-500">
              Visão geral dos seus gastos
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow hover:scale-[1.02] transition">
            <p className="text-2xl mb-1">📈</p>
            <h3 className="font-semibold">Gráficos</h3>
            <p className="text-sm text-gray-500">
              Análise por categoria e tempo
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow hover:scale-[1.02] transition">
            <p className="text-2xl mb-1">🎯</p>
            <h3 className="font-semibold">Metas</h3>
            <p className="text-sm text-gray-500">
              Acompanhe seus objetivos financeiros
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow hover:scale-[1.02] transition">
            <p className="text-2xl mb-1">💾</p>
            <h3 className="font-semibold">Salvamento</h3>
            <p className="text-sm text-gray-500">
              Dados armazenados automaticamente
            </p>
          </div>

        </div>

        {/* Rodapé */}
        <div className="text-center text-sm text-gray-500">
          Desenvolvido com Next.js + React
        </div>

      </div>

    </PageContainer>
  )
}