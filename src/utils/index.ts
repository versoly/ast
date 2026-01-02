export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const kebabCaseToPascal = (input: string) => {
  return input.split('-').map(capitalizeFirstLetter).join('');
};
