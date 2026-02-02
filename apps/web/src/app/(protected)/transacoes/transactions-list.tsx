"use client";

import type {
  ListTransactionsOutput,
  TransactionType,
} from "@finance/validations";
import { EyeIcon, RefreshCwOffIcon } from "lucide-react";
import { useState } from "react";
import { listTransactionsAction } from "../actions/list-transactions";
import { reverseTransactionAction } from "../actions/reverse";
import ConfirmModal from "../components/confirm-action-modal";

export default function TransactionsList({
  initialData,
}: Readonly<{ initialData: ListTransactionsOutput }>) {
  const [transactions, setTransactions] = useState(initialData);
  const [isRevert, setIsRevert] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const handleFilter = async (type: TransactionType) => {
    const result = await listTransactionsAction({ type: type || undefined });
    setTransactions(result);
  };

  const handleReverse = async (transactionId: string) => {
    await reverseTransactionAction({ transactionId });
    globalThis.location.reload();
  };

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
        <select
          className="px-4 py-2 border border-slate-300 rounded-md"
          onChange={(e) => handleFilter(e.target.value as TransactionType)}
        >
          <option value="">Todos</option>
          <option value="INCOME">Depósitos</option>
          <option value="EXPENSE">Saques</option>
          <option value="TRANSFER">Transferências</option>
        </select>
      </div>

      <div className="bg-slate-50 shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-200 text-slate-700">
            <tr>
              <th className="text-left px-4 py-2">Data</th>
              <th className="text-left px-4 py-2">Conta</th>
              <th className="text-left px-4 py-2">Tipo de transação</th>
              <th className="text-right px-4 py-2">Valor</th>
              <th className="text-right px-4 py-2 flex justify-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.data.map((tx) => (
              <tr key={tx.id} className="border-t bg-slate-50">
                <td className="px-4 py-2 ">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{tx.accountName}</td>
                <td className="px-4 py-2">{tx.type}</td>
                <td
                  className={`px-4 py-2 font-semibold text-right ${
                    tx.type === "Depósito" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type === "Depósito" ? "+" : "-"}R$ {tx.amount}
                </td>
                <td className="px-4 py-2 text-right flex space-x-1.5 justify-center">
                  <button
                    type="button"
                    className="text-indigo-600 hover:underline"
                  >
                    <EyeIcon />
                  </button>

                  {tx.type === "Depósito" && (
                    <button
                      type="button"
                      className="text-indigo-600 hover:underline"
                      title="Reverter Depósito"
                      onClick={() => {
                        setId(tx.id);
                        setIsRevert(true);
                      }}
                    >
                      <RefreshCwOffIcon />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isRevert && id && (
        <ConfirmModal
          isOpen={isRevert}
          onClose={() => setIsRevert(false)}
          onConfirm={() => handleReverse(id)}
          title="Deseja mesmo reverter esta transação?"
          message="Esta ação irá reverter a transação e ajustar o saldo da conta correspondente."
        />
      )}
    </div>
  );
}
