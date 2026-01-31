import z from "zod";

export const createAccountInput = z.object({
  name: z.string(),
});

export type CreateAccountInput = z.infer<typeof createAccountInput>;
