import type { ReverseInput } from "@finance/validations";
import { api } from "../api-client";

export async function httpReverseTransaction(payload: ReverseInput) {
  await api.post("transactions/reverse", {
    json: payload,
  });
}
