"use server";
import type { LoginInput, LoginOutput } from "@finance/validations";
import { cookies } from "next/headers";
import type { FormState } from "@/hooks/use-hook-form-state";
import { httpLogin } from "@/http/auth/login";
import { errorCatch } from "@/utils";
import { justNumbers } from "@/utils/just-numbers";

export async function loginAction(
  payload: LoginInput,
): Promise<FormState<LoginOutput>> {
  try {
    const { access_token } = await httpLogin({
      ...payload,
      cpf: justNumbers(payload.cpf),
    });

    const cookieStore = await cookies();
    cookieStore.set("token", access_token, {
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return {
      success: true,
      message: "Login realizado com sucesso!",
    };
  } catch (error) {
    const err = await errorCatch(error);

    return err;
  }
}
