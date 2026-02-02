"use server";

import type { ListTransactionsQuery } from "@finance/validations";
import { httpListTransactions } from "@/http/transactions/list";

export async function listTransactionsAction(query: ListTransactionsQuery) {
  const result = await httpListTransactions(query);

  return result;
}
