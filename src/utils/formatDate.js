const getDatePartsPosition = format => {
  const sep = format.match(/[/-]/g)[0];
  const splitted = format.toLowerCase().split(sep);
  const dayPos = splitted.indexOf("dd");
  const monthPos = splitted.indexOf("mm");
  const yearPos = splitted.indexOf("yyyy");

  return { dayPos, monthPos, yearPos, sep };
};

const dualizeLoneNumbers = (num) => num.toString().length === 1 ? `0${num}` : num;

export const formatDateToString = (date, format) => {
  const { dayPos, monthPos, yearPos, sep } = getDatePartsPosition(format);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const preformatArray = [];
  preformatArray[dayPos] = dualizeLoneNumbers(day);
  preformatArray[monthPos] = dualizeLoneNumbers(month);
  preformatArray[yearPos] = year;

  return preformatArray.join(sep);
};

export const formatStringToDate = (dateString, format) => {
  const { dayPos, monthPos, yearPos, sep } = getDatePartsPosition(format);
  const splitted = dateString.split(sep);
  return new Date(
    `${splitted[monthPos]}/${splitted[dayPos]}/${splitted[yearPos]}`
  );
};

export const getYearFromDOB = (dob, format = 'DD/MM/YYYY') => {
  const { yearPos, sep } = getDatePartsPosition(format);
  return dob.split(sep)[yearPos];
};