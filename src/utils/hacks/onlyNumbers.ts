export const onlyNumbers = (value: any) => {
  if (!value) return value;

  const number = value.replace(/[^$0-9\.]/g, '');
  return number;
};
