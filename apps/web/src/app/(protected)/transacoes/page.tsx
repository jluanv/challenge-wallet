export default function TransactionsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Transações</h1>
        <button
          type="button"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Nova Transação
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar transações..."
          className="flex-1 px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <select className="px-4 py-2 border border-slate-300 rounded-md">
          <option>Todos</option>
          <option>Depósitos</option>
          <option>Saques</option>
          <option>Transferências</option>
        </select>
        <input
          type="date"
          className="px-4 py-2 border border-slate-300 rounded-md"
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-200 text-slate-700">
            <tr>
              <th className="text-left px-4 py-2">Data</th>
              <th className="text-left px-4 py-2">Descrição</th>
              <th className="text-left px-4 py-2">Conta</th>
              <th className="text-right px-4 py-2">Valor</th>
              <th className="text-right px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">01/02/2026</td>
              <td className="px-4 py-2">Depósito</td>
              <td className="px-4 py-2">Conta Corrente</td>
              <td className="px-4 py-2 text-green-600 font-semibold text-right">
                +R$ 500,00
              </td>
              <td className="px-4 py-2 text-right">
                <button
                  type="button"
                  className="text-indigo-600 hover:underline"
                >
                  Detalhes
                </button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">30/01/2026</td>
              <td className="px-4 py-2">Transferência para João</td>
              <td className="px-4 py-2">Conta Corrente</td>
              <td className="px-4 py-2 text-red-600 font-semibold text-right">
                -R$ 200,00
              </td>
              <td className="px-4 py-2 text-right">
                <button
                  type="button"
                  className="text-indigo-600 hover:underline"
                >
                  Detalhes
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
