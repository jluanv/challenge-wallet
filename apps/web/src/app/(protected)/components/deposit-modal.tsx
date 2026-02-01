"use client";

import { type DepositOutput, depositInput } from "@finance/validations";
import { Loader2Icon } from "lucide-react";
import z from "zod";
import { useHookFormState } from "@/hooks/use-hook-form-state";
import { ControlledInput } from "@/shared-components/controlled-input";
import Modal from "@/shared-components/modal";
import { depositAction } from "../actions/deposit";

interface DepositModalProps {
  isOpen: boolean;
  accountId: string;
  onClose: () => void;
  onDeposit: (transaction: DepositOutput) => void;
}

export default function DepositModal({
  isOpen,
  onClose,
  onDeposit,
  accountId,
}: Readonly<DepositModalProps>) {
  const [form, _, onSubmit, isPending] = useHookFormState({
    action: (data) => depositAction({ amount: data.amount, accountId }),
    schema: depositInput.extend({
      amount: z.string(),
    }),
    onSuccess: (data) => {
      if (data) {
        onDeposit(data);
        onClose();
      }
    },
    defaultValues: {
      accountId: accountId,
      amount: "",
    },
  });

  console.log({ erros: form.formState.errors });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-slate-800 mb-4">Depósito</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <ControlledInput
            control={form.control}
            name="amount"
            label="Valor R$"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-300 hover:bg-slate-400"
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
              "Depositar"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
