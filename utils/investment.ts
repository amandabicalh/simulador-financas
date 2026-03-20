export type InvestmentPoint = {
  month: number
  value: number
}

export function calculateInvestment(
  initial: number,
  monthly: number,
  rate: number,
  months: number
): InvestmentPoint[] {
  const safeInitial = Number.isFinite(initial) ? Math.max(0, initial) : 0
  const safeMonthly = Number.isFinite(monthly) ? Math.max(0, monthly) : 0
  const safeRate = Number.isFinite(rate) ? Math.max(0, rate) : 0
  const safeMonths = Number.isFinite(months) ? Math.max(1, Math.floor(months)) : 1

  let total = safeInitial
  const data: InvestmentPoint[] = []

  for (let i = 1; i <= safeMonths; i++) {
    total = total * (1 + safeRate / 100) + safeMonthly

    data.push({
      month: i,
      value: Number(total.toFixed(2)),
    })
  }

  return data
}