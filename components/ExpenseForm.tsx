"use client"

import { useState } from "react"
import toast from "react-hot-toast"


type Expense = {
  name: string
  amount: number
  category: string
}

type ExpenseFormProps = {
  onAddExpense: (expense: Expense) => void
}

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState<number>(0)
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState("")

 function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  if (isSubmitting) return

  setIsSubmitting(true)

  if (!name || !amount || !category) {
    toast.error("Preencha todos os campos")
    setIsSubmitting(false)
    return
  }

  const newExpense = {
  name,
  amount,
  category,
  date: date ? date + "T12:00:00" : new Date().toISOString(),
}

  onAddExpense(newExpense)

  setName("")
  setAmount(0)
  setCategory("")
  setDate("")

  toast.success("Despesa adicionada com sucesso!")

  setTimeout(() => {
    setIsSubmitting(false)
  }, 500)
}
  return (
    <form
      className="p-6 bg-white rounded-2xl shadow-md flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-gray-700">
        Adicionar despesa
      </h2>

      {/* Nome */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Nome</label>
        <input
          type="text"
          placeholder="Ex: Pizza"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Valor */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Valor</label>
        <input
          type="number"
          placeholder="Ex: 50"
          value={amount === 0 ? "" : amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(Number(e.target.value))
          }
          min="0"
          step="0.01"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Categoria */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Categoria</label>
        <select
          value={category}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCategory(e.target.value)
          }
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Selecione uma categoria</option>
          <option value="comida">🍔 Comida</option>
          <option value="transporte">🚗 Transporte</option>
          <option value="lazer">🎮 Lazer</option>
          <option value="mercado">🛒 Mercado</option>
          <option value="outros">📦 Outros</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
  <label className="text-sm font-medium">Data</label>
  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="border p-2 rounded-lg"
  />
</div>

      {/* Botão */}
      <button
        type="submit"
        className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
      >
        Adicionar
      </button>
    </form>
  )
}