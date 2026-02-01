import { z } from "zod";

export const summaryOutput = z.object({
  totalBalance: z.number(),
  accounts: z.array(
    z.object({ id: z.string(), name: z.string(), balance: z.number() }),
  ),
  recentTransactions: z.array(
    z.object({
      id: z.string(),
      date: z.date(),
      type: z.string(),
      amount: z.number(),
      accountId: z.string(),
    }),
  ),
});

export type SummaryOutput = z.infer<typeof summaryOutput>;
