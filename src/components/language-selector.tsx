"use client"

import { useI18n, Lang } from "@/lib/i18n-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LanguageSelector() {
  const { lang, setLang } = useI18n()
  return (
    <Select value={lang} onValueChange={(value) => setLang(value as Lang)}>
      <SelectTrigger className="w-28 sm:w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pt">🇧🇷 Português</SelectItem>
        <SelectItem value="en">🇺🇸 English</SelectItem>
        <SelectItem value="es">🇪🇸 Español</SelectItem>
      </SelectContent>
    </Select>
  )
}

