export default function VariableExpensesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registro de Despesa Variável</h1>
      <form className="flex flex-col gap-4 max-w-xs">
        <input className="border p-2" placeholder="Descrição" type="text" />
        <input className="border p-2" placeholder="Valor" type="number" />
        <button className="bg-red-600 text-white py-2 rounded" type="submit">Adicionar</button>
      </form>
    </div>
  );
}
