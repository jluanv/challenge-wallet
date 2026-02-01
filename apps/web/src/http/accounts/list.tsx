import type { ListAccountsOutput } from "@finance/validations";
import { api } from "../api-client";

export async function httpAccountsList() {
  const result = await api.get("accounts").json<ListAccountsOutput>();

  return result;
}
