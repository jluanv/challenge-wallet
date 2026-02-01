import { formatCurrency } from "@/utils";
import { summaryAction } from "../actions/summary";

export default async function DashboardPage() {
  const summary = await summaryAction();

  return (
    <div className="w-full p-8">
      <div className="bg-indigo-600 text-white rounded-lg p-6 mb-8">
        <h2 className="text-lg">Saldo total disponível</h2>
        <p className="text-3xl font-bold">
          {formatCurrency(summary.totalBalance)}
        </p>
      </div>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-slate-700 mb-4">
          Minhas Contas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {summary.accounts.map((account) => (
            <div key={account.id} className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-indigo-600 font-semibold">{account.name}</h4>
              <p className="text-slate-700">
                {formatCurrency(account.balance)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-slate-700 mb-4">
          Últimas Transações
        </h3>
        {summary.recentTransactions.length > 0 ? (
          <ul className="bg-white rounded-lg shadow divide-y divide-slate-200">
            {summary.recentTransactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between p-4">
                <span>
                  {new Date(transaction.date).toLocaleDateString("pt-BR")} -{" "}
                  {transaction.type}
                </span>
                <span
                  className={`font-semibold ${
                    transaction.amount >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.amount >= 0
                    ? `+R$ ${transaction.amount.toFixed(2)}`
                    : `-R$ ${Math.abs(transaction.amount).toFixed(2)}`}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-slate-400">Sem transações recentes...</span>
        )}
      </section>
    </div>
  );
}
