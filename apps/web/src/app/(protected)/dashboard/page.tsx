export default function DashboardPage() {
  return (
    <div className="w-full p-8">
      <div className="bg-indigo-600 text-white rounded-lg p-6 mb-8">
        <h2 className="text-lg">Saldo disponível</h2>
        <p className="text-3xl font-bold">R$ 5.250,00</p>
      </div>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-slate-700 mb-4">
          Minhas Contas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-indigo-600 font-semibold">Conta Corrente</h4>
            <p className="text-slate-700">R$ 3.000,00</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-indigo-600 font-semibold">Poupança</h4>
            <p className="text-slate-700">R$ 2.250,00</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-slate-700 mb-4">
          Últimas Transações
        </h3>
        <ul className="bg-white rounded-lg shadow divide-y divide-slate-200">
          <li className="flex justify-between p-4">
            <span>01/02 - Depósito</span>
            <span className="text-green-600 font-semibold">+R$ 500,00</span>
          </li>
          <li className="flex justify-between p-4">
            <span>30/01 - Transferência</span>
            <span className="text-red-600 font-semibold">-R$ 200,00</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
