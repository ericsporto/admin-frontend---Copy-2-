export const formatToPercent = (value: string | number) => {
  const valueFormatted = Number(value).toLocaleString('pt-BR', {
    style: 'percent',
  });

  return valueFormatted;
};
