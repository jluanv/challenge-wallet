import z from "zod";

export const withdrawInput = z.object({
  accountId: z.uuid(),
  amount: z.number(),
});

export { depositOutput as withdrawOutput } from "./deposit.js";

export type WithdrawInput = z.infer<typeof withdrawInput>;

export type { DepositOutput as WithdrawOutput } from "./deposit.js";
