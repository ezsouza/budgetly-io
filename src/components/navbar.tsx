"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { LanguageSelector } from "@/components/language-selector"

export function Navbar() {
  const { user, logout } = useAuth()
  const { t } = useI18n()
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">
          {t("app.name")}
        </Link>
        <nav className="flex items-center gap-2">
          <LanguageSelector />
          {user ? (
            <>
              <span className="text-sm text-slate-600">{t("navbar.hello")} {user}</span>
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
    </header>
  )
}
