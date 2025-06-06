export default function RegisterPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Usuário</h1>
      <form className="flex flex-col gap-4 max-w-xs">
        <input className="border p-2" placeholder="Nome" type="text" />
        <input className="border p-2" placeholder="Email" type="email" />
        <input className="border p-2" placeholder="Senha" type="password" />
        <button className="bg-blue-600 text-white py-2 rounded" type="submit">Registrar</button>
      </form>
    </div>
  );
}
