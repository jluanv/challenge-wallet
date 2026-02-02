import type { TransferInput, TransferOutput } from "@finance/validations";
import { api } from "../api-client";

export async function httpTransfer(
  payload: TransferInput,
): Promise<TransferOutput> {
  const result = await api
    .post("transactions/transfer", {
      json: payload,
    })
    .json<TransferOutput>();

  return result;
}
