"use server";
import type { DeleteAccountOutput } from "@finance/validations";
import type { FormState } from "@/hooks/use-hook-form-state";
import { httpDeleteAccount } from "@/http/accounts/delete-account";
import { errorCatch } from "@/utils";

export async function deleteAccountAction(
  id: string,
): Promise<FormState<DeleteAccountOutput>> {
  try {
    const result = await httpDeleteAccount(id);
    return {
      success: true,
      message: "Conta inativada com sucesso!",
      data: result,
    };
  } catch (error) {
    const err = await errorCatch(error);

    return err;
  }
}
