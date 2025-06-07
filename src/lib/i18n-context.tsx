"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type Lang = "en" | "pt" | "es"

interface I18nContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    "app.name": "Budgetly",
    "navbar.logout": "Logout",
    "navbar.login": "Login",
    "navbar.signup": "Sign Up",
    "navbar.hello": "Hello,",
    "common.loading": "Loading...",
    "dashboard.title": "Finance Tracker",
    "dashboard.subtitle": "Manage your monthly finances with ease",
    "dashboard.addTransaction": "Add Transaction",
    "dashboard.expenseBreakdown": "Expense Breakdown",
    "dashboard.recentTransactions": "Recent Transactions",
    "dashboard.quickActions": "Quick Actions",
    "dashboard.addIncome": "Add Income",
    "dashboard.addFixedExpense": "Add Fixed Expense",
    "dashboard.addVariableExpense": "Add Variable Expense",
    "monthNavigation.previous": "Previous",
    "monthNavigation.next": "Next",
    "financialSummary.totalIncome": "Total Income",
    "financialSummary.fixedExpenses": "Fixed Expenses",
    "financialSummary.variableExpenses": "Variable Expenses",
    "financialSummary.netIncome": "Net Income",
    "expenseChart.noExpenses": "No expenses recorded yet.",
    "recentTransactions.noTransactions":
      "No transactions yet. Add your first transaction to get started!",
    "transactionList.noTransactions1":
      "No transactions found for this month.",
    "transactionList.noTransactions2":
      "Add your first transaction to get started!",
    "transactionList.recurring": "Recurring",
    "addTransaction.headerTitle": "Add Transaction",
    "addTransaction.headerSubtitle": "Record a new financial transaction",
    "addTransaction.details": "Transaction Details",
    "addTransaction.type": "Transaction Type",
    "addTransaction.income": "Income",
    "addTransaction.fixedExpense": "Fixed Expense",
    "addTransaction.variableExpense": "Variable Expense",
    "addTransaction.amount": "Amount ($)",
    "addTransaction.description": "Description",
    "addTransaction.enterDescription": "Enter transaction description",
    "addTransaction.category": "Category",
    "addTransaction.selectCategory": "Select a category",
    "addTransaction.date": "Date",
    "addTransaction.recurringTransaction": "Recurring Transaction",
    "addTransaction.numberOfMonths": "Number of Months",
    "addTransaction.recurrencePattern": "Recurrence Pattern",
    "addTransaction.startDate": "Start Date",
    "addTransaction.endDate": "End Date",
    "addTransaction.monthly": "Monthly",
    "addTransaction.semiAnnually": "Semi-Annually",
    "addTransaction.annually": "Annually",
    "addTransaction.custom": "Custom",
    "addTransaction.selectMonths": "Select Months",
    "addTransaction.save": "Save Transaction",
    "transactionsPage.allTransactions": "All Transactions",
    "transactionsPage.viewManage": "View and manage your transactions",
    "transactionsPage.transactionsFor": "Transactions for",
    "monthlyBudgetPage.title": "Monthly Budget",
    "login.email": "Email",
    "login.password": "Password",
    "login.logIn": "Log In",
    "login.noAccount": "Don't have an account?",
    "login.signUp": "Sign Up",
    "signup.signUp": "Sign Up",
    "signup.haveAccount": "Already have an account?",
    "signup.logIn": "Log In",
    "category.Salary": "Salary",
    "category.Freelance": "Freelance",
    "category.Investment": "Investment",
    "category.Other": "Other",
    "category.Rent": "Rent",
    "category.Insurance": "Insurance",
    "category.Loan Payment": "Loan Payment",
    "category.Subscription": "Subscription",
    "category.Utilities": "Utilities",
    "category.Food": "Food",
    "category.Transportation": "Transportation",
    "category.Entertainment": "Entertainment",
    "category.Shopping": "Shopping",
    "category.Healthcare": "Healthcare",
  },
  pt: {
    "app.name": "Budgetly",
    "navbar.logout": "Sair",
    "navbar.login": "Entrar",
    "navbar.signup": "Criar Conta",
    "navbar.hello": "Olá,",
    "common.loading": "Carregando...",
    "dashboard.title": "Controle Financeiro",
    "dashboard.subtitle": "Gerencie suas finanças mensais com facilidade",
    "dashboard.addTransaction": "Adicionar Transação",
    "dashboard.expenseBreakdown": "Distribuição de Despesas",
    "dashboard.recentTransactions": "Transações Recentes",
    "dashboard.quickActions": "Ações Rápidas",
    "dashboard.addIncome": "Adicionar Receita",
    "dashboard.addFixedExpense": "Adicionar Despesa Fixa",
    "dashboard.addVariableExpense": "Adicionar Despesa Variável",
    "monthNavigation.previous": "Anterior",
    "monthNavigation.next": "Próximo",
    "financialSummary.totalIncome": "Receita Total",
    "financialSummary.fixedExpenses": "Despesas Fixas",
    "financialSummary.variableExpenses": "Despesas Variáveis",
    "financialSummary.netIncome": "Saldo",
    "expenseChart.noExpenses": "Nenhuma despesa registrada.",
    "recentTransactions.noTransactions":
      "Nenhuma transação ainda. Adicione sua primeira transação para começar!",
    "transactionList.noTransactions1":
      "Nenhuma transação encontrada para este mês.",
    "transactionList.noTransactions2":
      "Adicione sua primeira transação para começar!",
    "transactionList.recurring": "Recorrente",
    "addTransaction.headerTitle": "Adicionar Transação",
    "addTransaction.headerSubtitle": "Registre uma nova transação financeira",
    "addTransaction.details": "Detalhes da Transação",
    "addTransaction.type": "Tipo de Transação",
    "addTransaction.income": "Receita",
    "addTransaction.fixedExpense": "Despesa Fixa",
    "addTransaction.variableExpense": "Despesa Variável",
    "addTransaction.amount": "Valor (R$)",
    "addTransaction.description": "Descrição",
    "addTransaction.enterDescription": "Digite a descrição",
    "addTransaction.category": "Categoria",
    "addTransaction.selectCategory": "Selecione uma categoria",
    "addTransaction.date": "Data",
    "addTransaction.recurringTransaction": "Transação Recorrente",
    "addTransaction.numberOfMonths": "Número de Meses",
    "addTransaction.recurrencePattern": "Padrão de Recorrência",
    "addTransaction.startDate": "Data de Início",
    "addTransaction.endDate": "Data de Término",
    "addTransaction.monthly": "Mensal",
    "addTransaction.semiAnnually": "Semestral",
    "addTransaction.annually": "Anual",
    "addTransaction.custom": "Personalizado",
    "addTransaction.selectMonths": "Selecione os Meses",
    "addTransaction.save": "Salvar Transação",
    "transactionsPage.allTransactions": "Todas as Transações",
    "transactionsPage.viewManage": "Veja e gerencie suas transações",
    "transactionsPage.transactionsFor": "Transações de",
    "monthlyBudgetPage.title": "Orçamento Mensal",
    "login.email": "Email",
    "login.password": "Senha",
    "login.logIn": "Entrar",
    "login.noAccount": "Não possui conta?",
    "login.signUp": "Cadastrar",
    "signup.signUp": "Cadastrar",
    "signup.haveAccount": "Já possui conta?",
    "signup.logIn": "Entrar",
    "category.Salary": "Salário",
    "category.Freelance": "Freelance",
    "category.Investment": "Investimento",
    "category.Other": "Outro",
    "category.Rent": "Aluguel",
    "category.Insurance": "Seguro",
    "category.Loan Payment": "Pagamento de Empréstimo",
    "category.Subscription": "Assinatura",
    "category.Utilities": "Serviços",
    "category.Food": "Alimentação",
    "category.Transportation": "Transporte",
    "category.Entertainment": "Entretenimento",
    "category.Shopping": "Compras",
    "category.Healthcare": "Saúde",
  },
  es: {
    "app.name": "Budgetly",
    "navbar.logout": "Salir",
    "navbar.login": "Iniciar Sesión",
    "navbar.signup": "Registrarse",
    "navbar.hello": "Hola,",
    "common.loading": "Cargando...",
    "dashboard.title": "Control Financiero",
    "dashboard.subtitle": "Administra tus finanzas mensuales fácilmente",
    "dashboard.addTransaction": "Agregar Transacción",
    "dashboard.expenseBreakdown": "Distribución de Gastos",
    "dashboard.recentTransactions": "Transacciones Recientes",
    "dashboard.quickActions": "Acciones Rápidas",
    "dashboard.addIncome": "Agregar Ingreso",
    "dashboard.addFixedExpense": "Agregar Gasto Fijo",
    "dashboard.addVariableExpense": "Agregar Gasto Variable",
    "monthNavigation.previous": "Anterior",
    "monthNavigation.next": "Siguiente",
    "financialSummary.totalIncome": "Ingresos Totales",
    "financialSummary.fixedExpenses": "Gastos Fijos",
    "financialSummary.variableExpenses": "Gastos Variables",
    "financialSummary.netIncome": "Saldo",
    "expenseChart.noExpenses": "Aún no se registran gastos.",
    "recentTransactions.noTransactions":
      "No hay transacciones. ¡Agrega tu primera transacción para comenzar!",
    "transactionList.noTransactions1":
      "No se encontraron transacciones este mes.",
    "transactionList.noTransactions2":
      "¡Agrega tu primera transacción para comenzar!",
    "transactionList.recurring": "Recurrente",
    "addTransaction.headerTitle": "Agregar Transacción",
    "addTransaction.headerSubtitle": "Registra una nueva transacción financiera",
    "addTransaction.details": "Detalles de la Transacción",
    "addTransaction.type": "Tipo de Transacción",
    "addTransaction.income": "Ingreso",
    "addTransaction.fixedExpense": "Gasto Fijo",
    "addTransaction.variableExpense": "Gasto Variable",
    "addTransaction.amount": "Monto ($)",
    "addTransaction.description": "Descripción",
    "addTransaction.enterDescription": "Ingresa la descripción",
    "addTransaction.category": "Categoría",
    "addTransaction.selectCategory": "Seleccione una categoría",
    "addTransaction.date": "Fecha",
    "addTransaction.recurringTransaction": "Transacción Recurrente",
    "addTransaction.numberOfMonths": "Número de Meses",
    "addTransaction.recurrencePattern": "Patrón de Recurrencia",
    "addTransaction.startDate": "Fecha de Inicio",
    "addTransaction.endDate": "Fecha Final",
    "addTransaction.monthly": "Mensual",
    "addTransaction.semiAnnually": "Semestral",
    "addTransaction.annually": "Anual",
    "addTransaction.custom": "Personalizado",
    "addTransaction.selectMonths": "Seleccionar Meses",
    "addTransaction.save": "Guardar Transacción",
    "transactionsPage.allTransactions": "Todas las Transacciones",
    "transactionsPage.viewManage": "Ver y administrar tus transacciones",
    "transactionsPage.transactionsFor": "Transacciones de",
    "monthlyBudgetPage.title": "Presupuesto Mensual",
    "login.email": "Correo",
    "login.password": "Contraseña",
    "login.logIn": "Iniciar Sesión",
    "login.noAccount": "¿No tienes cuenta?",
    "login.signUp": "Regístrate",
    "signup.signUp": "Regístrate",
    "signup.haveAccount": "¿Ya tienes cuenta?",
    "signup.logIn": "Iniciar Sesión",
    "category.Salary": "Salario",
    "category.Freelance": "Freelance",
    "category.Investment": "Inversión",
    "category.Other": "Otro",
    "category.Rent": "Alquiler",
    "category.Insurance": "Seguro",
    "category.Loan Payment": "Pago de Préstamo",
    "category.Subscription": "Suscripción",
    "category.Utilities": "Servicios",
    "category.Food": "Alimentación",
    "category.Transportation": "Transporte",
    "category.Entertainment": "Entretenimiento",
    "category.Shopping": "Compras",
    "category.Healthcare": "Salud",
  },
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null
    if (stored) {
      setLangState(stored)
      document.documentElement.lang = stored
    } else if (typeof navigator !== "undefined") {
      const navLang = navigator.language.slice(0, 2)
      const detected = navLang === "pt" ? "pt" : navLang === "es" ? "es" : "en"
      setLangState(detected)
      document.documentElement.lang = detected
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", l)
    }
    document.documentElement.lang = l
  }

  const t = (key: string) => {
    return translations[lang][key] || translations.en[key] || key
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}

