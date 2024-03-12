export const formatTel = (value: any) => {
  if (!value) return value;

  const phone = value.replace(/\D/g, '');
  if (phone.length <= 2) {
    return `(${phone}`;
  } else if (phone.length <= 7) {
    return `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
  } else {
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
  }
};
