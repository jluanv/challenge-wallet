import z from "zod";

export const deleteAccountOutput = z.object({
  id: z.uuid(),
  name: z.string(),
  balance: z.number(),
  userId: z.uuid(),
  isActive: z.boolean(),
});

export type DeleteAccountOutput = z.infer<typeof deleteAccountOutput>;
