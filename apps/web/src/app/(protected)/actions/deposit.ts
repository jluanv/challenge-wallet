"use server";

import type { DepositInput, DepositOutput } from "@finance/validations";
import type { FormState } from "@/hooks/use-hook-form-state";
import { httpDeposit } from "@/http/transactions/deposit";
import { errorCatch } from "@/utils";

export async function depositAction(
  payload: DepositInput,
): Promise<FormState<DepositOutput>> {
  try {
    const result = await httpDeposit({
      ...payload,
      amount: Number(payload.amount),
    });
    return {
      success: true,
      message: "Deoposito feito com sucesso!",
      data: result,
    };
  } catch (error) {
    const err = await errorCatch(error);

    return err;
  }
}
