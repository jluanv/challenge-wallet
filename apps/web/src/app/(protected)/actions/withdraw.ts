"use server";

import type { WithdrawInput, WithdrawOutput } from "@finance/validations";
import type { FormState } from "@/hooks/use-hook-form-state";
import { httpWithdraw } from "@/http/transactions/withdraw";
import { errorCatch } from "@/utils";

export async function withdrawAction(
  payload: WithdrawInput,
): Promise<FormState<WithdrawOutput>> {
  try {
    const result = await httpWithdraw({
      ...payload,
      amount: Number(payload.amount),
    });
    return {
      success: true,
      message: "Saque feito com sucesso!",
      data: result,
    };
  } catch (error) {
    const err = await errorCatch(error);

    return err;
  }
}
