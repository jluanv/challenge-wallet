import { TransactionType } from "../../prisma/generated/enums";

export const transactionTypeTranslate: Record<TransactionType, string> = {
  [TransactionType.INCOME]: "Depósito",
  [TransactionType.EXPENSE]: "Saque",
  [TransactionType.TRANSFER]: "Transferência",
};
