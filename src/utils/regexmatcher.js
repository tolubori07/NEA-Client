const regmatch = (reg, string) => {
  const regex = new RegExp(reg);
  return regex.test(string);
};

export default regmatch;
