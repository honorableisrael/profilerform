import React from "react";

import months from "../../../../utils/months";
import getDayOfWeek from "../../../../utils/day-of-week";

const DatePickerHeader = ({
  year,
  month,
  showYears,
  currentDay,
  currentDate,
  setShowYears,
  currentYearRef
}) => (
  <div className="calendar-view-header">
    <div className="year-view">
      <div
        onClick={() => {
          if (showYears) return setShowYears(false);
          setShowYears(true);
          const timeout = setTimeout(() => {
            currentYearRef.current.scrollIntoView();
            clearTimeout(timeout);
          }, 200);
        }}
      >
        {year} <span className="down-facing-arrow">&#129171;</span>
      </div>
      <div onClick={() => setShowYears(false)}>
        {getDayOfWeek(currentDate.getDay())}, {months[month].slice(0, 3)}{" "}
        {currentDay}
      </div>
    </div>
  </div>
);

export default DatePickerHeader;
