export const editDate = (created_at: any) => {
  if (!created_at) return;

  const dateEdited = new Date(created_at).toLocaleDateString('pt-br');

  return dateEdited;
};
export const editDateInputModel = (created_at: any) => {
  if (!created_at) return;

  const dateEdited = new Date(created_at).toLocaleDateString('pt-br');
  var dia = dateEdited.split('/')[0];
  var mes = dateEdited.split('/')[1];
  var ano = dateEdited.split('/')[2];

  return ano + '-' + ('0' + mes).slice(-2) + '-' + ('0' + dia).slice(-2);
};

export const inputDate = (created_at: any) => {
  if (!created_at) return '';

  const date = new Date(created_at);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const editDateWithHours = (created_at: any) => {
  if (!created_at) return '';

  const dateObj = new Date(created_at);

  const day = ('0' + dateObj.getDate()).slice(-2);
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const year = dateObj.getFullYear();

  const hour = ('0' + dateObj.getHours()).slice(-2);
  const min = ('0' + dateObj.getMinutes()).slice(-2);

  const dateFormated = day + '/' + month + '/' + year + ' ' + hour + ':' + min;

  return dateFormated;
};
