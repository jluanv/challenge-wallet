import z from "zod";

export const depositInput = z.object({
  accountId: z.uuid(),
  amount: z.number(),
});

export type DepositInput = z.infer<typeof depositInput>;
