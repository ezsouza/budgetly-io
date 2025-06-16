import type { CreditCard } from './types'

// In-memory store for credit cards
let creditCards: CreditCard[] = [
  {
    id: 'card1',
    name: 'Personal Visa',
    brand: 'Visa',
    closingDay: 20,
    dueDay: 28,
    limit: 5000,
  },
]

export function getAllCreditCards(): CreditCard[] {
  return creditCards
}

export function addCreditCard(card: CreditCard): void {
  creditCards.push(card)
}

export function updateCreditCard(id: string, updated: Partial<CreditCard>): void {
  creditCards = creditCards.map((c) => (c.id === id ? { ...c, ...updated } : c))
}

export function deleteCreditCard(id: string): void {
  creditCards = creditCards.filter((c) => c.id !== id)
}

export function getCreditCardById(id: string): CreditCard | undefined {
  return creditCards.find((c) => c.id === id)
}
