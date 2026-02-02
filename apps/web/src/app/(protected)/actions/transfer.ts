"use server";

import type { TransferInput, TransferOutput } from "@finance/validations";
import type { FormState } from "@/hooks/use-hook-form-state";
import { httpTransfer } from "@/http/transactions/transfer";
import { errorCatch } from "@/utils";

export async function transferAction(
  payload: TransferInput,
): Promise<FormState<TransferOutput>> {
  try {
    const result = await httpTransfer({
      ...payload,
      amount: Number(payload.amount),
    });
    return {
      success: true,
      message: "Transferência feita com sucesso!",
      data: result,
    };
  } catch (error) {
    const err = await errorCatch(error);

    return err;
  }
}
