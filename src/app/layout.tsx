import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { I18nProvider } from "@/lib/i18n-context"
import { CurrencyProvider } from "@/lib/currency-context"
import { Navbar } from "@/components/navbar"
import { DarkModeProvider } from "@/lib/dark-mode-context"

export const metadata: Metadata = {
  title: "Personal Finance Tracker",
  description: "Track your monthly finances with ease - manage income, fixed expenses, and variable expenses",
  keywords: "finance, budget, expense tracker, income, personal finance",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">{/* Using default font for now */}
        <DarkModeProvider>
          <I18nProvider>
            <CurrencyProvider>
              <AuthProvider>
                <Navbar />
                {children}
              </AuthProvider>
            </CurrencyProvider>
          </I18nProvider>
        </DarkModeProvider>
      </body>
    </html>
  )
}
