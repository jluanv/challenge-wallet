"use client";

import type {
  CreateAccountOutput,
  DepositOutput,
  ListAccountsOutput,
} from "@finance/validations";
import { useState } from "react";
import { deleteAccountAction } from "../actions/delete-account";
import AccountModal from "../components/accounts-modal";
import ConfirmModal from "../components/confirm-action-modal";
import DepositModal from "../components/deposit-modal";

export default function AccountsClient({
  initialAccounts,
}: Readonly<{ initialAccounts: ListAccountsOutput }>) {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeposit, setIsDeposit] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const handleAccountAdded = (newAcc: CreateAccountOutput) => {
    setAccounts((prev) => [...prev, newAcc]);
  };

  const handleDeposit = (deposit: DepositOutput) => {
    setAccounts((prev) => {
      const accountIndex = prev.findIndex(
        (acc) => acc.id === deposit.accountId,
      );
      if (accountIndex === -1) return prev;
      const updatedAccounts = [...prev];
      const account = updatedAccounts[accountIndex];
      updatedAccounts[accountIndex] = {
        ...account,
        balance: account.balance + deposit.amount,
      };
      return updatedAccounts;
    });
  };

  const handleDeleteAccount = async (accountId: string) => {
    const { success, data } = await deleteAccountAction(accountId);
    const accountIndex = accounts.findIndex((acc) => acc.id === accountId);

    if (success && accountIndex !== -1 && data) {
      setAccounts((prev) => {
        const updatedAccounts = [...prev];
        updatedAccounts[accountIndex] = data;
        return updatedAccounts;
      });
      setIsDelete(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Minhas Contas</h1>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Adicionar Conta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className={`bg-white shadow rounded-lg p-4 ${acc.isActive ? "" : "opacity-70"}`}
          >
            <h2 className="text-indigo-600 font-semibold">
              {acc.name}
              {!acc.isActive && (
                <p className="text-xs text-red-500">(Inativa)</p>
              )}
            </h2>
            <p className="text-slate-700">Saldo: R$ {acc.balance}</p>
            <div className="flex gap-2 mt-3 flex-wrap">
              {acc.balance > 0 && (
                <button
                  type="button"
                  className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                >
                  Transferir
                </button>
              )}
              <button
                type="button"
                className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                onClick={() => {
                  setId(acc.id);
                  setIsDeposit(true);
                }}
              >
                Depositar
              </button>

              <button
                type="button"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                type="button"
                className={` text-white px-3 py-1 rounded ${
                  acc.isActive
                    ? "bg-red-600  hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={() => {
                  setId(acc.id);
                  setIsDelete(true);
                }}
              >
                {acc.isActive ? "Inativar" : "Ativar"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <AccountModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onAccountAdded={handleAccountAdded}
        />
      )}

      {isDelete && id && (
        <ConfirmModal
          isOpen={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={() => handleDeleteAccount(id)}
          title="Deseja mesmo inativar esta conta?"
        />
      )}

      {isDeposit && id && (
        <DepositModal
          isOpen={isDeposit}
          accountId={id}
          onClose={() => setIsDeposit(false)}
          onDeposit={(data) => handleDeposit(data)}
        />
      )}
    </div>
  );
}
