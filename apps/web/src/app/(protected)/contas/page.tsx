import { listAccountsAction } from "../actions/list-accounts";
import AccountsClient from "./accounts-client";

export default async function AccountsPage() {
  const accounts = await listAccountsAction();

  return <AccountsClient initialAccounts={accounts} />;
}
