export const formatDataAfterPicker = (value: Date) => {
  if (!value) return;

  const day = value.getDate().toString().padStart(2, '0');
  const month = (value.getMonth() + 1).toString().padStart(2, '0');

  const year = value.getFullYear();

  const months = [
    'jan',
    'fev',
    'mar',
    'abr',
    'mai',
    'jun',
    'jul',
    'ago',
    'set',
    'out',
    'nov',
    'dez',
  ];

  const mesAbreviado = months[value.getMonth()];

  const dataFormatada = `${day} ${mesAbreviado} ${year}`;

  return dataFormatada;
};
