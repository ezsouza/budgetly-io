"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"

interface MonthNavigationProps {
  currentMonth: string
}

export function MonthNavigation({ currentMonth }: MonthNavigationProps) {
  const { t, lang } = useI18n()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

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
    const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US"
    return date.toLocaleDateString(locale, { month: "long", year: "numeric" })
  }

  const isAnnual = pathname.startsWith("/annual-overview")
  const overviewHref = isAnnual
    ? `/?month=${currentMonth}`
    : `/annual-overview?month=${currentMonth}`

  return (
    <div className="space-y-2 bg-card text-card-foreground rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth("prev")}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          {t("monthNavigation.previous")}
        </Button>

        <h2 className="text-xl font-semibold text-foreground">
          {formatMonth(currentMonth)}
        </h2>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth("next")}
          className="flex items-center gap-2"
        >
          {t("monthNavigation.next")}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <Link href={overviewHref} className="block">
        <Button variant="outline" size="sm" className="w-full">
          {isAnnual
            ? t("monthNavigation.backToMonth")
            : t("dashboard.annualOverview")}
        </Button>
      </Link>
    </div>
  )
}
