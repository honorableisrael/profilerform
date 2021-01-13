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
  console.log(d);
  if (d.includes("/")) {
    var parts = d.split("/");
    // const result = parts[2] + "-" + parts[1] + "-" + parts[0];
    const result = parts.join("-");
    console.log(result);
    return result;
  }
  if (d.includes("-")) {
    console.log("heere date error");
    return d;
  }
  return d;
};

export const logOut = () => {
  localStorage.clear();
  window.location.assign("/");
};
