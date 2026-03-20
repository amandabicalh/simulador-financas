"use client"

import { useState, useEffect } from "react"
import ExpenseForm from "@/components/ExpenseForm"
import FinanceChart from "@/components/FinanceChart"
import GoalTracker from "@/components/GoalTracker"
import ExpensesOverTime from "@/components/ExpensesOverTime"

// ✅ tipo da despesa
type Expense = {
  name: string
  amount: number
  category: string
  date?: string
}

export default function Dashboard() {
  // ✅ tipagem correta
  const [expenses, setExpenses] = useState<Expense[]>([])

  const [loaded, setLoaded] = useState(false)


  useEffect(() => {
  const saved = localStorage.getItem("expenses")
  if (saved) setExpenses(JSON.parse(saved))
  setLoaded(true)
}, [])

  useEffect(() => {
  if (loaded) {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }
}, [expenses, loaded])

  // ✅ tipado
  function addExpense(expense: Expense) {
  console.log("ADICIONANDO:", expense)
  setExpenses([...expenses, expense])
}

  // ✅ tipado
  function removeExpense(index: number) {
    setExpenses(expenses.filter((_, i) => i !== index))
  }

  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0)

  const groupedExpenses: Record<string, Expense[]> = {}

expenses.forEach((exp) => {
  if (!exp.date) return

  const date = new Date(exp.date)
  const formatted = date.toLocaleDateString("pt-BR")

  if (!groupedExpenses[formatted]) {
    groupedExpenses[formatted] = []
  }

  groupedExpenses[formatted].push(exp)
})

function getDayLabel(dateStr: string) {
  const today = new Date()
  const date = new Date(dateStr)

  const diffTime = today.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Hoje"
  if (diffDays === 1) return "Ontem"

  return dateStr
}

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center p-6">
  <div className="w-full max-w-5xl">

    <h1 className="text-3xl font-bold mb-6 text-gray-800">
      📊 Dashboard
    </h1>

    <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-4 rounded-xl mb-6 shadow">
  <p className="text-sm">Total de gastos</p>
  <h2 className="text-2xl font-bold">
    R$ {total.toFixed(2)}
  </h2>
</div>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="space-y-6">
        <ExpenseForm onAddExpense={addExpense} />

        <div className="bg-white p-4 rounded-xl shadow">
          <div className="space-y-4">
  {Object.entries(groupedExpenses).map(([date, items]) => (
    <div key={date}>
      <h3 className="text-sm font-semibold text-gray-500 mb-1">
        {getDayLabel(date)}
      </h3>

      <ul className="space-y-2">
        {items.map((exp, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-50 p-2 rounded"
          >
            <span>
              {exp.name} - R$ {exp.amount}
            </span>

            <button onClick={() => removeExpense(index)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>
        </div>
      </div>

      <div className="space-y-6">
        <FinanceChart expenses={expenses} />
        <ExpensesOverTime expenses={expenses} />
        <GoalTracker expenses={expenses} />
      </div>

    </div>
  </div>
</main>
  )
}