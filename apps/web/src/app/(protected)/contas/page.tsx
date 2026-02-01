export default function AccountsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Minhas Contas</h1>
        <button
          type="button"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Adicionar Conta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-indigo-600 font-semibold">Conta Corrente</h2>
          <p className="text-slate-700">Saldo: R$ 3.000,00</p>
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Transferir
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Editar
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Deletar
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-indigo-600 font-semibold">Poupança</h2>
          <p className="text-slate-700">Saldo: R$ 2.250,00</p>
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Transferir
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Editar
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Deletar
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-slate-700 mb-2">
          Transferir para outro cliente
        </h2>
        <input
          type="text"
          placeholder="Buscar por cpf, email ou ID da conta"
          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
    </div>
  );
}
