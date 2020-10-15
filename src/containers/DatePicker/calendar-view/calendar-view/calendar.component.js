import React from "react";

const Calendar = ({
  numOfDays,
  firstDayOfMonth,
  currentDay,
  handleDayClick
}) => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const daysArray = [];
  let count = 1;
  while (count <= numOfDays) {
    daysArray.push(count);
    count++;
  }
  const markup = days.map((day, index) => {
    return (
      <div className="day-wrapper" key={`${day}-${index}`}>
        <span className={day}>{day}</span>
      </div>
    );
  });
  for (let i = 0; i < firstDayOfMonth; i++)
    markup.push(
      <div key={0 - i} className="day-wrapper">
        <span />
      </div>
    );
  daysArray.forEach(day => {
    markup.push(
      <div key={day} className="day-wrapper">
        <span
          className={`day${day === currentDay ? " current" : ""}`}
          onClick={handleDayClick}
        >
          {day}
        </span>
      </div>
    );
  });

  return <div className="calendar">{markup}</div>;
};

export default Calendar;
