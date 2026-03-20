"use client"

import { useState, useEffect } from "react"

type Expense = {
  name: string
  amount: number
  category: string
}

export default function GoalTracker({ expenses }: { expenses: Expense[] }) {
  const [goal, setGoal] = useState(1000)
  const [category, setCategory] = useState("todas")

  // 📅 filtrar mês atual
  const currentMonth = new Date().getMonth()

  const filteredExpenses = expenses.filter((exp: any) => {
    const expDate = new Date(exp.date || Date.now())
    const sameMonth = expDate.getMonth() === currentMonth

    const sameCategory =
      category === "todas" || exp.category === category

    return sameMonth && sameCategory
  })

  const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0)

  const percentage = Math.min((total / goal) * 100, 100)

  // 💾 salvar meta
  useEffect(() => {
    const saved = localStorage.getItem("goalData")
    if (saved) {
      const parsed = JSON.parse(saved)
      setGoal(parsed.goal)
      setCategory(parsed.category)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "goalData",
      JSON.stringify({ goal, category })
    )
  }, [goal, category])

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h2 className="text-lg font-bold mb-3">🎯 Meta Financeira</h2>

      {/* INPUT META */}
      <input
        type="number"
        value={goal}
        onChange={(e) => setGoal(Number(e.target.value))}
        className="border p-2 rounded w-full mb-3"
        placeholder="Defina sua meta"
      />

      {/* SELECT CATEGORIA */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      >
        <option value="todas">Todas</option>
        <option value="comida">🍔 Comida</option>
        <option value="transporte">🚗 Transporte</option>
        <option value="lazer">🎮 Lazer</option>
        <option value="mercado">🛒 Mercado</option>
        <option value="outros">📦 Outros</option>
      </select>

      {/* INFO */}
      <p className="text-sm mb-2">
        Total no mês: R$ {total.toFixed(2)}
      </p>

      {/* BARRA */}
      <div className="w-full bg-gray-200 rounded h-4">
        <div
          className={`h-4 rounded transition-all ${
            percentage >= 100 ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* STATUS */}
      <p className="text-sm mt-2">
        {percentage >= 100
          ? "🚨 Você ultrapassou sua meta!"
          : `Faltam R$ ${(goal - total).toFixed(2)}`}
      </p>
    </div>
  )
}