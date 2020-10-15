// import React, { useState } from 'react';
// import ReactDatePicker from 'react-datepicker';
// import months from '../../utils/months';


// const NewDatePicker = () => {
//   () => {
//     const [startDate, setStartDate] = useState(new Date());
//     // const years = eachday(1990, getYear(new Date()) + 1, 1);
//     const years = [1990];
//     for (let i = 1; i < 10; i++) years.push(years[i - 1] + 1);
//     return (
//       <ReactDatePicker
//         renderCustomHeader={({
//           date,
//           changeYear,
//           changeMonth,
//           decreaseMonth,
//           increaseMonth,
//           prevMonthButtonDisabled,
//           nextMonthButtonDisabled
//         }) => (
//           <div
//             style={{
//               margin: 10,
//               display: "flex",
//               justifyContent: "center"
//             }}
//           >
//             <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
//               {"<"}
//             </button>
//             <select
//               value={getYear(date)}
//               onChange={({ target: { value } }) => changeYear(value)}
//             >
//               {years.map(option => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
  
//             <select
//               value={months[getMonth(date)]}
//               onChange={({ target: { value } }) =>
//                 changeMonth(months.indexOf(value))
//               }
//             >
//               {months.map(option => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
  
//             <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
//               {">"}
//             </button>
//           </div>
//         )}
//         selected={startDate}
//         onChange={date => setStartDate(date)}
//       />
//     );
//   };
// }
 
// export default NewDatePicker;