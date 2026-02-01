import z from "zod";

export const withdrawInput = z.object({
  accountId: z.uuid(),
  amount: z.number(),
});

export type WithdrawInput = z.infer<typeof withdrawInput>;
