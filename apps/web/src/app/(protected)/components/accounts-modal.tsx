"use client";

import {
  type CreateAccountOutput,
  createAccountInput,
} from "@finance/validations";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useHookFormState } from "@/hooks/use-hook-form-state";
import { ControlledInput } from "@/shared-components/controlled-input";
import Modal from "@/shared-components/modal";
import { createAccountAction } from "../actions/create-account";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccountAdded: (account: CreateAccountOutput) => void;
}

export default function AccountModal({
  isOpen,
  onClose,
  onAccountAdded,
}: Readonly<AccountModalProps>) {
  const [form, { success }, onSubimt, isPending] = useHookFormState({
    action: createAccountAction,
    schema: createAccountInput,
    onSuccess(data) {
      if (data) onAccountAdded(data);
    },
  });

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-slate-800 mb-4">Nova Conta</h2>
      <form onSubmit={onSubimt} className="space-y-4">
        <div>
          <ControlledInput
            control={form.control}
            name="name"
            label="Nome da conta"
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
            className="px-4 py-2 rounded flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2Icon className="size-6 animate-spin" />
            ) : (
              "Salvar"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
