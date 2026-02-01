import type {
  CreateAccountInput,
  CreateAccountOutput,
} from "@finance/validations";
import { api } from "../api-client";

export async function httpCreateAccount(data: CreateAccountInput) {
  const result = await api
    .post("accounts", { json: data })
    .json<CreateAccountOutput>();

  return result;
}
