export const FormatAmount = async (amount) => {
  await amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return await amount;
};
