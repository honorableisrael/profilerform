import { currencyInputCheckerRegex } from './regexUtils';


/**
 * Formats a string number value to two decimal places
 * @param {string} value
 * @returns {number}
 */
export const formatDecimals = (value) => {
  return parseFloat(parseFloat(value).toFixed(2));
};

/**
 * Clears comma from a string value
 * @param {string|number} value
 * @returns {string} cleaned value
 */
export const clearCommas = (value) => {
  if (typeof value === 'number') return value;
  else if (!value) return value;
  const str = value.toString();
  return str.replace(/,/g, '');
}


/**
   * Formats input values for currency fields with comma separators
   * @param {string|number} value
   * @param {boolean} isInput
   * @returns {string} formatted value
   */
export const formatCurrencyInput = (value) => {
  /**
   * '' -> ''
   * 10 -> 10
   * 1000 -> 1,000
   * 10. -> 10.
   * 10.0 -> 10.0
   * 10.14 -> 10.14
   */
  if (!value) return value;
  if (typeof value === 'string') value = clearCommas(value);
  value = value.toString();
  if (currencyInputCheckerRegex.test(value)) {
    let [whole, decimal] = value.split('.');
    whole = Number(whole).toLocaleString('en');
    const resArr = [whole];
    if (decimal !== undefined) {
      decimal = decimal ? (decimal.length > 2 ? Number(Number(`0.${decimal}`).toFixed(2).split('.')[1]) : decimal) : '';
      resArr.push(decimal);
    }
    return resArr.join('.');
  } return value;
};

export const roundToUpperTwoDecimalPlace = (num) => {
  const str = num.toString();
  if (!str.includes('.')) return num;
  const [whole, decimal] = str.split('.');
  if (decimal.length <= 2) return num;
  const res = +whole + +(
    `${Math.ceil(`${decimal.slice(0, 2)}.${decimal.slice(2)}`)}`
  ) / 100;
  return res;
}

export const handleChangeRetriever = (dispatch) => (handler, type, isCurrency) => (e) => {
  const { target } = e;
  let { value } = target;
  if (isCurrency) {
    const cleanedValue = clearCommas(value);
    handler({ target : { name: target.name, value: cleanedValue } });
    return dispatch({ type, payload: Number(cleanedValue) });
  }
  
  handler({ target });
  dispatch({ type, payload: value });
};
