"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { LanguageSelector } from "@/components/language-selector"
import { CurrencySelector } from "@/components/currency-selector"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const { user, logout } = useAuth()
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 relative flex items-center justify-between">
        <button
          className="sm:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="size-6" />
        </button>
        <Link
          href="/"
          className="font-bold text-lg absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 text-slate-900 dark:text-slate-100"
        >
          {t("app.name")}
        </Link>
        <nav className="hidden sm:flex items-center gap-2">
          <LanguageSelector />
          <CurrencySelector />
          <ThemeToggle />
          <Link href="/annual-overview">
            <Button variant="ghost">{t("navbar.timeline")}</Button>
          </Link>
          <Link href="/credit-cards">
            <Button variant="ghost">{t("navbar.wallet")}</Button>
          </Link>
          {user ? (
            <>
              <span className="text-sm text-slate-600 dark:text-slate-300">{t("navbar.hello")} {user}</span>
              <Button variant="outline" onClick={logout}>
                {t("navbar.logout")}
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">{t("navbar.login")}</Button>
              </Link>
              <Link href="/signup">
                <Button>{t("navbar.signup")}</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-64 h-full bg-white dark:bg-slate-800 shadow-xl p-4 flex flex-col">
            <button
              className="self-end mb-4"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="size-6" />
            </button>
            <div className="space-y-4">
              <LanguageSelector />
              <CurrencySelector />
              <ThemeToggle />
              <Link href="/annual-overview" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  {t("navbar.timeline")}
                </Button>
              </Link>
              <Link href="/credit-cards" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  {t("navbar.wallet")}
                </Button>
              </Link>
              {user ? (
                <>
                  <span className="text-sm text-slate-600 dark:text-slate-300">{t("navbar.hello")} {user}</span>
                  <Button variant="outline" onClick={logout} className="w-full justify-start">
                    {t("navbar.logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      {t("navbar.login")}
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    <Button className="w-full justify-start">{t("navbar.signup")}</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
