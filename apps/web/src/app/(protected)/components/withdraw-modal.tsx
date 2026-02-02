"use client";

import { type WithdrawOutput, withdrawInput } from "@finance/validations";
import { Loader2Icon } from "lucide-react";
import z from "zod";
import { useHookFormState } from "@/hooks/use-hook-form-state";
import { ControlledInput } from "@/shared-components/controlled-input";
import Modal from "@/shared-components/modal";
import { withdrawAction } from "../actions/withdraw";

interface WithdrawModalProps {
  isOpen: boolean;
  accountId: string;
  onClose: () => void;
  onWithdraw: (transaction: WithdrawOutput) => void;
}

export default function WithdrawModal({
  isOpen,
  onClose,
  onWithdraw,
  accountId,
}: Readonly<WithdrawModalProps>) {
  const [form, _, onSubmit, isPending] = useHookFormState({
    action: (data) => withdrawAction({ amount: data.amount, accountId }),
    schema: withdrawInput.extend({
      amount: z.string(),
    }),
    onSuccess: (data) => {
      if (data) {
        onWithdraw(data);
        onClose();
      }
    },
    defaultValues: {
      accountId: accountId,
      amount: "",
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-slate-800 mb-4">Saque</h2>
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
              "Sacar"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
