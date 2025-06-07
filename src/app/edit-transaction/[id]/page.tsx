import { Suspense } from "react"
import EditTransactionForm from "./EditTransactionForm"

export default function EditTransactionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditTransactionForm />
    </Suspense>
  )
}
