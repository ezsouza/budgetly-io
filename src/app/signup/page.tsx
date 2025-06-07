"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signup } = useAuth()
  const router = useRouter()
  const { t } = useI18n()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signup(email)
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-sm w-full bg-white p-6 rounded-lg shadow">
        <div className="space-y-2">
          <Label htmlFor="email">{t("login.email")}</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t("login.password")}</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full">{t("signup.signUp")}</Button>
        <p className="text-center text-sm text-muted-foreground">
          {t("signup.haveAccount")} <Link href="/login" className="underline">{t("signup.logIn")}</Link>
        </p>
      </form>
    </div>
  )
}
