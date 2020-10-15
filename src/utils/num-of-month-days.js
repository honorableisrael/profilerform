const thirtyDaysMonths = [3, 8, 5, 10];

export default date => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const isLeapYear = year % 4 === 0;
  const numOfDays = thirtyDaysMonths.includes(month)
    ? 30
    : month === 1 && isLeapYear
    ? 29
    : month === 1
    ? 28
    : 31;
  return { numOfDays, month, year };
};
