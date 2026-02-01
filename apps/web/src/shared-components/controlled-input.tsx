import type { JSX } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

type ControlledInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  mask?: (value: string) => string;
  icon?: JSX.Element;
};

export function ControlledInput<T extends FieldValues>({
  control,
  name,
  label,
  mask,
  icon,
  ...rest
}: ControlledInputProps<T> & React.ComponentProps<"input" | "textarea">) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = mask ? mask(e.target.value) : e.target.value;
          field.onChange(value);
        };

        return (
          <div className="flex flex-col gap-1.5 relative">
            <label htmlFor={field.name} className="block text-slate-600 mb-1">
              {label}
            </label>
            <input
              id={field.name}
              {...field}
              {...(rest as React.ComponentProps<"input">)}
              onChange={handleChange}
              value={field.value || ""}
              autoComplete="on"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            {fieldState?.error && (
              <span className="text-red-500 text-sm">
                {fieldState.error.message === "Required"
                  ? "Campo obrigatório!"
                  : fieldState.error.message}
              </span>
            )}
            {icon && (
              <div className="absolute top-1/2 right-2 text-blue100 cursor-pointer">
                {icon}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
