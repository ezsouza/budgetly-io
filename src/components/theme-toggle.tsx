"use client"

import { Moon, Sun } from "lucide-react"
import { useDarkMode } from "@/lib/dark-mode-context"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { isDark, toggle } = useDarkMode()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="w-9 h-9"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}
