import z from "zod";

export const transferInput = z.object({
  fromAccountId: z.uuid(),
  toAccountId: z.uuid(),
  amount: z.number(),
});

export type TransferInput = z.infer<typeof transferInput>;
