"use server";
import type { LoginInput, LoginOutput } from "@finance/validations";
import { api } from "../api-client";

export async function httpLogin(payload: LoginInput): Promise<LoginOutput> {
  const result = await api
    .post("auth/login", {
      json: payload,
    })
    .json<LoginOutput>();

  return result;
}
