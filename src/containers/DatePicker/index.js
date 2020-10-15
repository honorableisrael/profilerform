import React, { useState } from "react";

import "./styles/datepicker.style.css";
import CalendarView from './calendar-view/calendar-view';

const DatePicker = ({
  value,
  format,
  inputStyle,
  minimumYear,
  maximumYear,
  requireValue,
  getAppendants,
  inputClassName,
  parentClassName,
  handleDateChange
}) => {
  const [showCalendarView, setShowCalendarView] = useState(false);
  const appendants = getAppendants ? getAppendants(() => setShowCalendarView(!showCalendarView)) : [];
  const inputProps = {};
  if (requireValue) inputProps.required = true;
  inputProps.placeholder = format ? format : "DD/MM/YYYY";

  const handleInputFocus = () => setShowCalendarView(true);

  return (
    <div
      className={`datepicker-wrapper${
        parentClassName ? ` ${parentClassName}` : ""
      }`}
    >
      <input
        type="text"
        className={inputClassName}
        value={value || ""}
        style={inputStyle}
        onChange={({ target }) => {
          target.value = value || "";
        }}
        onFocus={handleInputFocus}
        {...inputProps}
      />
      {appendants}
      <CalendarView
        {...{
          value,
          format,
          minimumYear,
          maximumYear,
          handleDateChange,
          showCalendarView,
          setShowCalendarView
        }}
      />
    </div>
  );
};

export default DatePicker;
