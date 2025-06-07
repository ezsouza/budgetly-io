"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface AuthState {
  user: string | null
  login: (email: string) => void
  signup: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("user") : null
    if (stored) setUser(stored)
  }, [])

  const login = (email: string) => {
    setUser(email)
    if (typeof window !== "undefined") {
      localStorage.setItem("user", email)
    }
  }

  const signup = login

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return ctx
}
