import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Budgetly</h1>
      <p className="mb-4">App de finanças pessoais com controle de receitas e despesas.</p>
      <nav className="flex flex-col gap-2">
        <Link className="text-blue-600 underline" href="/(auth)/register">Cadastro de Usuário</Link>
        <Link className="text-blue-600 underline" href="/(auth)/login">Login</Link>
        <Link className="text-blue-600 underline" href="/incomes">Registro de Receita</Link>
        <Link className="text-blue-600 underline" href="/expenses/fixed">Despesa Fixa</Link>
        <Link className="text-blue-600 underline" href="/expenses/variable">Despesa Variável</Link>
        <Link className="text-blue-600 underline" href="/categories">Categorias</Link>
        <Link className="text-blue-600 underline" href="/monthly">Visualização por Mês</Link>
        <Link className="text-blue-600 underline" href="/summary">Resumo Financeiro</Link>
      </nav>
    </div>
  );
}
