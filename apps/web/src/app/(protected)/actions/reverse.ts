"use server";

import type { ReverseInput } from "@finance/validations";
import { httpReverseTransaction } from "@/http/transactions/reverse";
import { errorCatch } from "@/utils";

export async function reverseTransactionAction(payload: ReverseInput) {
  try {
    await httpReverseTransaction({
      ...payload,
    });
    return {
      success: true,
      message: "Transação revertida com sucesso!",
    };
  } catch (error) {
    const err = await errorCatch(error);

    return err;
  }
}
