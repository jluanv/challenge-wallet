import z from "zod";
import { createAccountOutput } from "../accounts/create-account.js";

export const transferInput = z.object({
  fromAccountId: z.uuid(),
  toAccountId: z.uuid(),
  amount: z.number(),
});

export const transferOutput = z.object({
  toResult: createAccountOutput,
  fromResult: createAccountOutput,
});

export type TransferInput = z.infer<typeof transferInput>;

export type TransferOutput = z.infer<typeof transferOutput>;
