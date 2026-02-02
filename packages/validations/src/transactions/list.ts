import { z } from "zod";
import { transactionTypeSchema } from "./deposit.js";

export const listTransactionsQuery = z.object({
  type: transactionTypeSchema.optional(),
  page: z.number().default(1).optional(),
  limit: z.number().default(10).optional(),
});

export const listTransactionsOutput = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      amount: z.number(),
      type: z.string(),
      accountName: z.string(),
      createdAt: z.date(),
    }),
  ),
  params: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

export type ListTransactionsQuery = z.infer<typeof listTransactionsQuery>;

export type ListTransactionsOutput = z.infer<typeof listTransactionsOutput>;
