import { clearCommas, formatCurrencyInput } from "./currencyUtils";

/**
 * Helps handle change event on an input field in the eligibility forms
 * @param {DOMEvent} event
 * @param {object} component
 * @param {DOMElement} errorElement
 */
export const handleCurrencyInputChange = async (event, component, errorElement) => {
  const { target } = event;
  const {
    value,
    dataset: { stateName }
  } = target;
  if (value[value.length - 1] === ",") return;
  // Hide class name "hide" to hide error message at the base
  if (errorElement) errorElement.classList.add("hide");
  const cleanedValue = clearCommas(value);
  // if (isNaN(cleanedValue))
  const formattedValue = formatCurrencyInput(value, true);
  // If the user intended value is an invalid valid show error message and set
  // entered value as current
  if (isNaN(cleanedValue)) {
    if (!component) return value;
    await component.setState({ [stateName]: value });
  } else {
    if (!component) return formattedValue;
    await component.setState({ [stateName]: formattedValue });
  }
};

/**
 * Toggles which form input element is enabled for step forms
 * @param {DOMElement} currentInput
 * @param {DOMElement} currentInputParent
 * @param {DOMElement} targetInput
 * @param {DOMElement} targetInputParent
 * @param {boolean} isSubmit
 */
export const toggleEnabledInput = (
  currentInput,
  currentInputParent,
  targetInput,
  targetInputParent,
  component,
  newFocusedPosition,
  isSubmit
) => {
  currentInput.disabled = true;
  currentInputParent.classList.add("disabled");
  targetInputParent.classList.remove("disabled");
  targetInput.disabled = false;
  if (isSubmit) targetInput.checkValidity();
  targetInput.focus();
  component.setState({ focusedInputPosition: newFocusedPosition });
};

export const getFormattedDate = (date) => date.toLocaleDateString();

export const handleSingleFieldBlur = (target, component, setValue) => {
  let { value, dataset: { stateName } } = target;
  value = value.trim();
  if (component) component.setState({ [stateName]: value });
  else setValue(value);
};

export const handleBlurByMass = async (component, fields) => {
  const data = {};
  fields.forEach((key) => {
    let { [key]: value } = component.state;
    value = value.trim();
    data[key] = value;
  });
  await component.setState(data);
};

export const dateRegexp = new RegExp(/^(?:0?[1-9]|[12][0-9]|3[01])\/(?:0?[1-9]|1[12])\/\d{4}$/);
