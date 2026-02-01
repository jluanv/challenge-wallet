export const justNumbers = (value: string) => {
  return value.replaceAll(/\D/g, "");
};
