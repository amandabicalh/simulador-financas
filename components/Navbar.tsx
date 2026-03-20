"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  function linkClass(path: string) {
    return `relative px-3 py-2 text-sm transition ${
      pathname === path
        ? "text-purple-600 font-medium"
        : "text-gray-600 hover:text-purple-600"
    }`
  }

  function underline(path: string) {
    return pathname === path
      ? "absolute left-0 -bottom-1 w-full h-[2px] bg-purple-600 rounded"
      : "hidden"
  }

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <h1 className="font-semibold text-lg text-gray-800">
          Finanças
        </h1>

        {/* Desktop */}
        <div className="hidden md:flex gap-6">
          <div className="relative">
            <Link href="/dashboard" className={linkClass("/dashboard")}>
              Dashboard
            </Link>
            <span className={underline("/dashboard")} />
          </div>

          <div className="relative">
            <Link href="/investimentos" className={linkClass("/investimentos")}>
              Investimentos
            </Link>
            <span className={underline("/investimentos")} />
          </div>

          <div className="relative">
            <Link href="/sobre" className={linkClass("/sobre")}>
              Sobre
            </Link>
            <span className={underline("/sobre")} />
          </div>
        </div>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden px-3 py-1 border rounded-lg text-gray-700"
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/dashboard" className={linkClass("/dashboard")} onClick={() => setOpen(false)}>
            Dashboard
          </Link>
          <Link href="/investimentos" className={linkClass("/investimentos")} onClick={() => setOpen(false)}>
            Investimentos
          </Link>
          <Link href="/sobre" className={linkClass("/sobre")} onClick={() => setOpen(false)}>
            Sobre
          </Link>
        </div>
      )}
    </nav>
  )
}