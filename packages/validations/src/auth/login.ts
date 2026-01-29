import z from "zod";
import { cpfValidate, passwordValidator } from "../utils/generic-validates";

export const loginInput = z.object({
  cpf: cpfValidate,
  password: passwordValidator,
});

export type LoginInput = z.infer<typeof loginInput>;
