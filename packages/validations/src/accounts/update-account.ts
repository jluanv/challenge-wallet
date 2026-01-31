import z from "zod";

export const updateAccountInput = z.object({
  name: z.string().optional(),
});

export type UpdateAccountInput = z.infer<typeof updateAccountInput>;
