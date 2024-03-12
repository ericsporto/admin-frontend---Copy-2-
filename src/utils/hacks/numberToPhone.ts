export const numberToPhone = (value: any) => {
  if (!value) return '';
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, '$1 $2');

  return value;
};
