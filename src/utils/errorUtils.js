import store from "../store";
import setErrors from "../store/actions/setErrors";

/**
 * Extracts errors from an Error object either returned the server or not
 * @param {object} error
 * @returns {array} errors
 */
export const extractErrors = (error) => {
  let errors = [];
  // If a server error extract the error data and populate "errors" with
  // the error actual messages
  if (error.response && error.response.status !== 500) {
    const { response: { data: { data: errorContainer, message } } } = error;
    if (message.toLowerCase().includes('validation')) {
      Object.values(errorContainer[0]).forEach((childError) => {
        childError.forEach((el) => errors.push(el));
      });
    } else { errors = errorContainer; }

  } else {
    if (!navigator.onLine) errors.push('No or slow internet connection');
    else errors.push('An error occured');
  }

  return errors;
};

export const clearErrorStore = () => store.dispatch(setErrors([]));