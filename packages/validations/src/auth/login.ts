import z from "zod";
import { cpfValidate, passwordValidator } from "../utils/generic-validates.js";

export const loginInput = z.object({
  cpf: cpfValidate,
  password: passwordValidator,
});

export type LoginInput = z.infer<typeof loginInput>;

export const loginOutput = z.object({
  access_token: z.string(),
});

export type LoginOutput = z.infer<typeof loginOutput>;
