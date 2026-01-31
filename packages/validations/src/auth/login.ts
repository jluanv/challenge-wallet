import z from "zod";
import { cpfValidate, passwordValidator } from "../utils/generic-validates.js";

export const loginInput = z.object({
  cpf: cpfValidate,
  password: passwordValidator,
});

export type LoginInput = z.infer<typeof loginInput>;
