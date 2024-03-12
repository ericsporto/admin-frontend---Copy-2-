export const formatCurrency = (value: string | undefined, locale: string) => {
  if (!value || !locale) return '';

  if (locale === 'en') {
    const numericValue = value.replace(/[^\d]/g, '');
    const floatValue = parseFloat(numericValue) / 100;
    const formattedValue = floatValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedValue;
  }

  if (locale === 'pt_BR') {
    const numericValue = value.replace(/\D/g, '');
    const floatValue = parseFloat(numericValue) / 100;
    const formattedValue = floatValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedValue;
  }

  return '';
};

export const formatPercentage = (value: string | undefined, locale: string) => {
  if (!value || !locale) return '';

  const decimalSeparator = locale === 'pt' ? ',' : '.';

  const numericValue = value.replace(/[^\d]/g, '');

  const maxValue = locale === 'pt' ? 10000 : 10000;
  const newValue = Math.min(parseInt(numericValue), maxValue).toString();

  const interPart = newValue.slice(0, -2) || '0';
  const decimalPart = newValue.slice(-2).padStart(2, '0');
  const formattedValue = interPart + decimalSeparator + decimalPart;

  return formattedValue;
};

export const formatNumberBeforeRequest = (number: any) => {
  if (number === '0,00') return '0.00';
  if (number === '0.00') return '0.00';
  number = number.replace(/[.,]/g, '');
  if (number.includes('.')) {
    number = number.replace(/\.?0*$/, '');
  } else {
    number = number.replace(/^0*/, '');
  }
  if (number.length === 1) {
    number = '0.0' + number;
  } else if (number.length === 2) {
    number = '0.' + number;
  } else {
    number = number.slice(0, -2) + '.' + number.slice(-2);
  }
  return number;
};
