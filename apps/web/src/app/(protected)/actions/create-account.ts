"use server";
import type {
  CreateAccountInput,
  CreateAccountOutput,
} from "@finance/validations";
import type { FormState } from "@/hooks/use-hook-form-state";
import { httpCreateAccount } from "@/http/accounts/create-account";
import { errorCatch } from "@/utils";

export async function createAccountAction(
  payload: CreateAccountInput,
): Promise<FormState<CreateAccountOutput>> {
  try {
    const result = await httpCreateAccount(payload);
    return {
      success: true,
      message: "Conta adicionada com sucesso!",
      data: result,
    };
  } catch (error) {
    const err = await errorCatch(error);

    return err;
  }
}
