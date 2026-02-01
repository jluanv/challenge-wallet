"use client";
import { loginInput } from "@finance/validations";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useHookFormState } from "@/hooks/use-hook-form-state";
import { privateRoutes } from "@/routes/routes";
import { ControlledInput } from "@/shared-components/controlled-input";
import { maskCpf } from "@/utils";
import { loginAction } from "../actions/login";

export function LoginForm() {
  const router = useRouter();

  const [form, _, onSubmit, isPending] = useHookFormState({
    action: loginAction,
    schema: loginInput,
    onSuccess: () => router.push(privateRoutes.DASHBOARD),
  });

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <ControlledInput
        control={form.control}
        label="CPF"
        name="cpf"
        placeholder="999.999.999-99"
        mask={maskCpf}
      />
      <ControlledInput
        control={form.control}
        label="Senha"
        name="password"
        type="password"
        placeholder="••••••••"
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 flex items-center justify-center text-white py-2 rounded-md hover:bg-indigo-700 transition"
        disabled={isPending}
      >
        {isPending ? <Loader2Icon className="size-6 animate-spin" /> : "Entrar"}
      </button>
    </form>
  );
}
