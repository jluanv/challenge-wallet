import z from "zod";
import { cpfValidate, passwordValidator } from "../utils/generic-validates.js";

export const createUserInput = z.object({
  cpf: cpfValidate,
  name: z.string().optional(),
  email: z.email().optional(),
  password: passwordValidator,
});

export type CreateUserInput = z.infer<typeof createUserInput>;
