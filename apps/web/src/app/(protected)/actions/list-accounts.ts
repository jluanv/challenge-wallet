"use server";

import { httpAccountsList } from "@/http/accounts/list";

export async function listAccountsAction() {
  const result = await httpAccountsList();

  return result;
}
