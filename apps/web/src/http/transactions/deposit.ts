import type { DepositInput, DepositOutput } from "@finance/validations";
import { api } from "../api-client";

export async function httpDeposit(
  payload: DepositInput,
): Promise<DepositOutput> {
  const result = await api
    .post("transactions/deposit", {
      json: payload,
    })
    .json<DepositOutput>();

  return result;
}
