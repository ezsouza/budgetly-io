import { Suspense } from "react"
import AddTransactionForm from "./AddTransactionForm"

export default function AddTransactionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddTransactionForm />
    </Suspense>
  )
}
