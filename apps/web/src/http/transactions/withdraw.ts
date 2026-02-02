import type { WithdrawInput, WithdrawOutput } from "@finance/validations";
import { api } from "../api-client";

export async function httpWithdraw(
  payload: WithdrawInput,
): Promise<WithdrawOutput> {
  const result = await api
    .post("transactions/withdraw", {
      json: payload,
    })
    .json<WithdrawOutput>();

  return result;
}
