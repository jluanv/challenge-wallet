import z from "zod";

export const depositInput = z.object({
  accountId: z.uuid(),
  amount: z.number(),
});

export const transactionTypeSchema = z.enum(["INCOME", "EXPENSE", "TRANSFER"]);

export const depositOutput = z.object({
  type: transactionTypeSchema,
  accountId: z.string(),
  amount: z.number(),
  id: z.string(),
  createdAt: z.date(),
  userId: z.string(),
  reversedBy: z.string().nullable(),
});

export type DepositInput = z.infer<typeof depositInput>;

export type DepositOutput = z.infer<typeof depositOutput>;

export type TransactionType = z.infer<typeof transactionTypeSchema>;
