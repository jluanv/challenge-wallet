"use client";

import { type TransferOutput, transferInput } from "@finance/validations";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { useHookFormState } from "@/hooks/use-hook-form-state";
import Modal from "@/shared-components/modal";
import { transferAction } from "../actions/transfer";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransfer: (transaction: TransferOutput) => void;
  accountId: string;
  accounts: { id: string; name: string }[];
}

export default function TransferModal({
  isOpen,
  onClose,
  onTransfer,
  accounts,
  accountId,
}: Readonly<TransferModalProps>) {
  const [mode, setMode] = useState<"internal" | "external">("internal");

  const [form, _, onSubmit, isPending] = useHookFormState({
    action: transferAction,
    schema: transferInput.extend({
      amount: z.string(),
    }),
    onSuccess: (transaction) => {
      if (transaction) onTransfer(transaction);
      onClose();
    },
    defaultValues: {
      fromAccountId: accountId,
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-slate-800 mb-4">Transferência</h2>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          className={`px-4 py-2 rounded ${
            mode === "internal"
              ? "bg-indigo-600 text-white"
              : "bg-slate-200 text-slate-700"
          }`}
          onClick={() => setMode("internal")}
        >
          Entre minhas contas
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded ${
            mode === "external"
              ? "bg-indigo-600 text-white"
              : "bg-slate-200 text-slate-700"
          }`}
          onClick={() => setMode("external")}
        >
          Para outro usuário
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="fromAccountId" className="block text-slate-600 mb-1">
            Conta origem
          </label>
          <select
            {...form.register("fromAccountId")}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Selecione</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>
        </div>

        {mode === "internal" && (
          <div>
            <label htmlFor="toAccountId" className="block text-slate-600 mb-1">
              Conta destino
            </label>
            <select
              {...form.register("toAccountId")}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Selecione</option>
              {accounts
                .filter((acc) => acc.id !== form.getValues("fromAccountId"))
                .map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="amount" className="block text-slate-600 mb-1">
            Valor
          </label>
          <input
            {...form.register("amount")}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-300 hover:bg-slate-400"
            disabled={isPending}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2Icon className="size-6 animate-spin" />
            ) : (
              "Transferir"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
