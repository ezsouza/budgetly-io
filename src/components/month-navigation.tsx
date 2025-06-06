"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface MonthNavigationProps {
  currentMonth: string
}

export function MonthNavigation({ currentMonth }: MonthNavigationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const navigateMonth = (direction: "prev" | "next") => {
    const [year, month] = currentMonth.split("-").map(Number)
    let newYear = year
    let newMonth = month

    if (direction === "prev") {
      newMonth -= 1
      if (newMonth < 1) {
        newMonth = 12
        newYear -= 1
      }
    } else {
      newMonth += 1
      if (newMonth > 12) {
        newMonth = 1
        newYear += 1
      }
    }

    const newDate = `${newYear}-${newMonth.toString().padStart(2, "0")}`
    const params = new URLSearchParams(searchParams.toString())
    params.set("month", newDate)
    router.push(`?${params.toString()}`)
  }

  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
      <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")} className="flex items-center gap-2">
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <h2 className="text-xl font-semibold text-slate-900">{formatMonth(currentMonth)}</h2>

      <Button variant="outline" size="sm" onClick={() => navigateMonth("next")} className="flex items-center gap-2">
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
