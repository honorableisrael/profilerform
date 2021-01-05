export const FormatAmount = async (amount) => {
  await amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return await amount;
};
export const toLowercase = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toLowerCase() + s.slice(1);
};
