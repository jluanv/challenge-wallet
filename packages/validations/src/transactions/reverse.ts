import z from "zod";

export const reverseInput = z.object({
  transactionId: z.uuid(),
});

export type ReverseInput = z.infer<typeof reverseInput>;
