const inputNumber = (value: string) => {
  const regex = /[^0-9]/g;
  return value.replace(regex, "");
};

export default inputNumber;
