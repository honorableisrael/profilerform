import moment from "moment";

export const FormatAmount = async (amount) => {
  await amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return await amount;
};
export const toLowercase = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toLowerCase() + s.slice(1);
};
export const formatDate = (d) => {
  console.log(typeof d)
  const date = moment(d).format("YYYY-mm-dd");
  console.log(date);
  return date;
};
