"use client";

import type {
  CreateAccountOutput,
  DepositOutput,
  ListAccountsOutput,
  TransferOutput,
  WithdrawOutput,
} from "@finance/validations";
import { useState } from "react";
import { deleteAccountAction } from "../actions/delete-account";
import AccountCard from "../components/account-card";
import AccountModal from "../components/accounts-modal";
import ConfirmModal from "../components/confirm-action-modal";
import DepositModal from "../components/deposit-modal";
import TransferModal from "../components/transfer-modal";
import WithdrawModal from "../components/withdraw-modal";

export default function AccountsClient({
  initialAccounts,
}: Readonly<{ initialAccounts: ListAccountsOutput }>) {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeposit, setIsDeposit] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);

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

  const handleWithdraw = (withdraw: WithdrawOutput) => {
    setAccounts((prev) => {
      const accountIndex = prev.findIndex(
        (acc) => acc.id === withdraw.accountId,
      );
      if (accountIndex === -1) return prev;
      const updatedAccounts = [...prev];
      const account = updatedAccounts[accountIndex];
      updatedAccounts[accountIndex] = {
        ...account,
        balance: account.balance - withdraw.amount,
      };
      return updatedAccounts;
    });
  };

  const handleTransfer = (transfer: TransferOutput) => {
    setAccounts((prev) => {
      const accountFromIndex = prev.findIndex(
        (acc) => acc.id === transfer.fromResult.id,
      );

      const accountResultIndex = prev.findIndex(
        (acc) => acc.id === transfer.toResult.id,
      );

      if (accountFromIndex === -1) return prev;
      const updatedAccounts = [...prev];
      const account = updatedAccounts[accountFromIndex];
      updatedAccounts[accountFromIndex] = {
        ...account,
        balance: transfer.fromResult.balance,
      };

      if (accountResultIndex === -1) return prev;
      const accountResult = updatedAccounts[accountResultIndex];
      updatedAccounts[accountResultIndex] = {
        ...accountResult,
        balance: transfer.toResult.balance,
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
          <AccountCard
            key={acc.id}
            acc={acc}
            setId={setId}
            setIsDelete={setIsDelete}
            setIsDeposit={setIsDeposit}
            setIsWithdraw={setIsWithdraw}
            setIsTransfer={setIsTransfer}
          />
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

      {isWithdraw && id && (
        <WithdrawModal
          isOpen={isWithdraw}
          accountId={id}
          onClose={() => setIsWithdraw(false)}
          onWithdraw={(data) => handleWithdraw(data)}
        />
      )}

      {isTransfer && id && (
        <TransferModal
          isOpen={isTransfer}
          accounts={accounts}
          onClose={() => setIsTransfer(false)}
          accountId={id}
          onTransfer={(data) => handleTransfer(data)}
        />
      )}
    </div>
  );
}
