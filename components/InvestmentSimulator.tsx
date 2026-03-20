"use client"

import { useState } from "react"
import { calculateInvestment } from "@/utils/investment"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js"
import type { ChartData, ChartOptions } from "chart.js"
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
)

export default function InvestmentSimulator() {
  const [initial, setInitial] = useState(1000)
  const [monthly, setMonthly] = useState(200)
  const [rate, setRate] = useState(1)
  const [months, setMonths] = useState(12)

  const [goal, setGoal] = useState(10000)

  const data = calculateInvestment(initial, monthly, rate, months)
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  const finalValue = data[data.length - 1]?.value || 0
  const progress = Math.min((finalValue / goal) * 100, 100)
  const missingAmount = Math.max(goal - finalValue, 0)

  function safeNumber(value: string, min = 0) {
    const parsed = Number(value)
    if (!Number.isFinite(parsed)) return min
    return Math.max(min, parsed)
  }

  const chartData: ChartData<"line", number[], string> = {
    labels: data.map((_, index) => `Mês ${index + 1}`),
    datasets: [
      {
        label: "Valor acumulado",
        data: data.map((item) => item.value),
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  }

  const chartOptions: ChartOptions<"line"> = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const parsedValue = context.parsed.y ?? 0
            return `${context.dataset.label}: ${currencyFormatter.format(parsedValue)}`
          },
        },
      },
    },
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold mb-4">
        💰 Simulador de Investimento
      </h2>

      <p className="text-sm text-gray-600 mb-4">
        Descubra quanto seu dinheiro pode render ao longo do tempo com juros compostos.
      </p>

      <div className="grid grid-cols-1 gap-3">

        <div>
          <label className="text-sm font-medium">Valor inicial (R$)</label>
          <input
            type="number"
            value={initial}
            onChange={(e) => setInitial(safeNumber(e.target.value))}
            min="0"
            step="0.01"
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Aporte mensal (R$)</label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(safeNumber(e.target.value))}
            min="0"
            step="0.01"
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Taxa de juros (% ao mês)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(safeNumber(e.target.value))}
            min="0"
            step="0.01"
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Tempo (meses)</label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(safeNumber(e.target.value, 1))}
            min="1"
            step="1"
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
  <label className="text-sm font-medium">Meta (R$)</label>
  <input
    type="number"
    value={goal}
    onChange={(e) => setGoal(safeNumber(e.target.value))}
    min="0"
    step="0.01"
    className="border p-2 rounded w-full"
  />
</div>

      </div>

      <div className="mt-4 p-3 bg-green-100 rounded">
        <p className="font-semibold text-green-700">
          💸 Total acumulado: {currencyFormatter.format(finalValue)}
        </p>
        <p className="text-sm mt-2">
        {finalValue >= goal
            ? "🎉 Você atingiu sua meta!"
            : `Faltam ${currencyFormatter.format(missingAmount)} para sua meta`}
        </p>
        
        <div className="mt-4">
  <div className="w-full bg-gray-200 rounded-full h-4">
    <div
      className="bg-green-500 h-4 rounded-full transition-all duration-500"
      style={{ width: `${progress}%` }}
    />
  </div>

  <p className="text-sm mt-1 text-gray-600">
    {progress.toFixed(1)}% da meta atingida
  </p>
</div>

      </div>
      <div className="mt-6">
  <Line data={chartData} options={chartOptions} />
</div>
    </div>
    
  )
}