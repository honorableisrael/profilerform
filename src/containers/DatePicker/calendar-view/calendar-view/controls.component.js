import React from "react";
import { formatDateToString } from "../../../../utils/formatDate";

const Controls = ({
  setShowCalendarView,
  handleDateChange,
  currentDate,
  format
}) => {
  const handleSet = () => {
    handleDateChange(formatDateToString(currentDate, format));
    setShowCalendarView(false);
  };

  const handleClear = () => {
    handleDateChange("");
    setShowCalendarView(false);
  };

  return (
    <div className="controls">
      <button onClick={handleClear} type='button'>clear</button>

      <div>
        <button onClick={() => setShowCalendarView(false)} type='button'>cancel</button>

        <button onClick={handleSet} type='button'>set</button>
      </div>
    </div>
  );
};

export default Controls;
