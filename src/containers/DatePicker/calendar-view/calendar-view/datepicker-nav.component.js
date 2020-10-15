import React from "react";

import months from "../../../../utils/months";

const DatePickerNavigator = ({
  year,
  month,
  handleMonthBackWards,
  handleMonthForwards
}) => (
  <div className="header-navigator">
    <span onClick={handleMonthBackWards}>&#8249;</span>
    <div className="month-year">
      {months[month]}, {year}
    </div>
    <span onClick={handleMonthForwards}>&#8250;</span>
  </div>
);

export default DatePickerNavigator;
