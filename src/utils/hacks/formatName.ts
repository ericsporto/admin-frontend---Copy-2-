export const formatName = (name: string) => {
  if (!name) return;
  const splitName = name.split(' ');

  const firstName = splitName[0];
  if (splitName.length > 1) {
    const lastName = splitName[splitName.length - 1];
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
};
