import z from "zod";

export const createAccountInput = z.object({
  name: z.string(),
});

export const createAccountOutput = z.object({
  id: z.uuid(),
  name: z.string(),
  balance: z.number(),
  userId: z.uuid(),
  isActive: z.boolean(),
});

export type CreateAccountInput = z.infer<typeof createAccountInput>;

export type CreateAccountOutput = z.infer<typeof createAccountOutput>;
