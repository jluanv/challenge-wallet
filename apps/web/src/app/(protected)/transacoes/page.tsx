import { listTransactionsAction } from "../actions/list-transactions";
import TransactionsList from "./transactions-list";

export default async function TransactionsPage() {
  const initialData = await listTransactionsAction({});
  return <TransactionsList initialData={initialData} />;
}
