export const formatingNumber = (num) => {
  const withCommas = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return withCommas;
};
