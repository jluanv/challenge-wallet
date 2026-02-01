"use client";
import type { input, ZodObject, ZodRawShape } from "@finance/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { type DefaultValues, type FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface FormState<T> {
  success: boolean | null;
  message: string | null;
  data?: T | null;
}

type UseHookFormStateProps<
  T extends FieldValues,
  TData,
  Schema extends ZodObject<ZodRawShape>,
> = {
  action: (data: T) => Promise<FormState<TData>>;
  schema: Schema;
  onSuccess?: (data?: TData | null) => Promise<void> | void;
  resetForm?: () => void;
  defaultValues?: DefaultValues<input<Schema>>;
};

export function useHookFormState<
  T extends FieldValues,
  TData,
  Schema extends ZodObject<ZodRawShape>,
>({
  action,
  onSuccess,
  resetForm,
  schema,
  defaultValues,
}: UseHookFormStateProps<T, TData, Schema>) {
  const [isPending, startTransition] = useTransition();

  const [formState, setFormState] = useState<FormState<TData>>({
    success: null,
    message: null,
    data: null,
  });

  async function handleSubmit(values: T) {
    startTransition(async () => {
      const state = await action(values);

      if (state.success) {
        toast.success(state.message || "Ação realizada com sucesso!");
        await onSuccess?.(state.data);
        if (resetForm) resetForm();
      } else {
        toast.error(
          state.message || "Ocorreu um erro, tente novamente mais tarde!",
        );
      }

      setFormState(state);
    });
  }

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = form.handleSubmit(() => handleSubmit(form.getValues() as T));

  return [form, formState, onSubmit, isPending] as const;
}
