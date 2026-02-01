import type { DeleteAccountOutput } from "@finance/validations";
import { api } from "../api-client";

export async function httpDeleteAccount(accountId: string) {
  const result = await api
    .patch(`accounts/${accountId}/delete`)
    .json<DeleteAccountOutput>();

  return result;
}
