export const maskCpf = (value: string) => {
  const onlyNumbers = value.replaceAll(/\D/g, "");

  const limited = onlyNumbers.slice(0, 11);

  let formattedCpf = limited.replace(/(\d{3})(\d)/, "$1.$2");
  formattedCpf = formattedCpf.replace(/(\d{3})(\d)/, "$1.$2");
  formattedCpf = formattedCpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return formattedCpf;
};
