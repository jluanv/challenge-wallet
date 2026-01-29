import z from "zod";

export const cpfValidate = z
  .string({
    error: "CPF é obrigatório.",
  })
  .refine((doc) => {
    const replacedDoc = doc.replaceAll(/\D/g, "");
    return replacedDoc.length >= 11;
  }, "CPF deve conter no mínimo 11 caracteres.")
  .refine((doc) => {
    const replacedDoc = doc.replaceAll(/\D/g, "");
    return replacedDoc.length <= 11;
  }, "CPFdeve conter no máximo 11 caracteres.")
  .refine((doc) => {
    const replacedDoc = doc.replaceAll(/\D/g, "");
    return !!Number(replacedDoc);
  }, "CPF deve conter apenas números.");

export const passwordValidator = z
  .string({ error: "Campo obrigatório!" })
  .min(8, { error: "Senha deve ter pelo menos 8 caracteres!" })
  .refine((val) => /[a-z]/.test(val), {
    error: "Senha deve conter pelo menos uma letra minúscula!",
  })
  .refine((val) => /[A-Z]/.test(val), {
    error: "Senha deve conter pelo menos uma letra maiúscula!",
  })
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    error: "Senha deve conter pelo menos um caractere especial!",
  });
