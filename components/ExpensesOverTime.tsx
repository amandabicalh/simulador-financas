"use client"

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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
)

type Expense = {
  name: string
  amount: number
  category: string
  date?: string
}

export default function ExpensesOverTime({
  expenses,
}: {
  expenses: Expense[]
}) {
  // 📅 agrupar por dia
  const grouped: Record<string, number> = {}

  expenses.forEach((exp) => {
    const date = new Date(exp.date || Date.now())
    const day = date.toLocaleDateString("pt-BR")

    if (!grouped[day]) grouped[day] = 0
    grouped[day] += exp.amount
  })

  const labels = Object.keys(grouped)
  const values = Object.values(grouped)

  const data = {
    labels,
    datasets: [
      {
        label: "Gastos por dia",
        data: values,
        borderColor: "#8B5CF6",
        backgroundColor: "#C4B5FD",
      },
    ],
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h2 className="text-lg font-bold mb-3">📈 Evolução dos gastos</h2>
      <Line data={data} />
    </div>
  )
}