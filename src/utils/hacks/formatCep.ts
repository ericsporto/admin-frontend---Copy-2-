export const formatCep = (value: string) => {
  if (!value) return value;

  const cep = value.replace(/\D/g, '');
  if (cep.length <= 5) {
    return cep;
  } else {
    return `${cep.slice(0, 5)}-${cep.slice(5, 8)}`;
  }
};
