import z from "zod";

export const listAccountsOutput = z.array(
  z.object({
    id: z.uuid(),
    name: z.string(),
    balance: z.number(),
    userId: z.uuid(),
    isActive: z.boolean(),
  }),
);

export type ListAccountsOutput = z.infer<typeof listAccountsOutput>;
