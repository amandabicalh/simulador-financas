"use client"

import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"
import type { ChartData, ChartOptions } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

type Expense = {
  name: string
  amount: number
  category: string
}

export default function FinanceChart({ expenses }: { expenses: Expense[] }) {
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  const categories: Record<string, number> = {}

  const categoryColors: Record<string, string> = {
  comida: "#ef4444",
  transporte: "#3b82f6",
  lazer: "#a855f7",
  mercado: "#10b981",
  outros: "#6b7280",
}
  
 expenses.forEach((exp) => {
  const category = exp.category.toLowerCase()

  if (!categories[category]) {
    categories[category] = 0
  }

  categories[category] += exp.amount
})

  const data: ChartData<"pie", number[], string> = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: Object.keys(categories).map(
            (cat) => categoryColors[cat] || "#10b981"
        ),
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<"pie"> = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label ? `${context.label}: ` : ""
            return `${label}${currencyFormatter.format(context.parsed)}`
          },
        },
      },
    },
  }

if (expenses.length === 0) {
  return <p className="mt-4 text-center">Adicione despesas para ver o gráfico 📊</p>
}

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Gastos por categoria</h2>
      <Pie data={data} options={options} />
    </div>
  )
}