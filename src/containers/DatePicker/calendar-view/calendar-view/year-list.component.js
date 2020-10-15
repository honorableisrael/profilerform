import React from "react";

const YearList = ({
  year,
  month,
  minYear,
  maxYear,
  currentDay,
  setCurrentDate,
  setShowYears,
  currentYearRef
}) => {
  const markup = [];
  let count = minYear;
  const handleYearClick = ({ target: { textContent } }) => {
    setCurrentDate(new Date(`${month + 1}/${currentDay}/${textContent}`));
    setShowYears(false);
  };
  while (count <= maxYear) {
    const isCurrentYear = year === count;
    const refProp = {};
    if (isCurrentYear) refProp.ref = currentYearRef;
    markup.push(
      <span
        key={count}
        {...refProp}
        className={`year-in-list${isCurrentYear ? " current-year" : ""}`}
        onClick={handleYearClick}
      >
        {count}
      </span>
    );
    count++;
  }

  return <div className="year-list">{markup}</div>;
};

export default YearList;
