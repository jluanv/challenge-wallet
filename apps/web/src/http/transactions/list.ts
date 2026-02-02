import type {
  ListTransactionsOutput,
  ListTransactionsQuery,
} from "@finance/validations";
import { api } from "../api-client";

export async function httpListTransactions(
  query: ListTransactionsQuery,
): Promise<ListTransactionsOutput> {
  const result = await api
    .get("transactions", {
      searchParams: query,
    })
    .json<ListTransactionsOutput>();

  return result;
}
