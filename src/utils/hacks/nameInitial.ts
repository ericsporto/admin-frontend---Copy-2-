export const handleName = (name: string | undefined) => {
  if (!name) return;
  const arrName = name?.split(' ');
  if (arrName?.length > 1) {
    return arrName[0][0] + arrName[1][0];
  } else {
    return arrName[0][0];
  }
};
