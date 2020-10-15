import { extractErrors } from "../../utils/errorUtils";
import { handleAuthSuccessServerCall, closeAuthFormModal } from "../../utils/authFormUtils";
import setLoading from "../actions/setLoading";
import setErrors from "../actions/setErrors";
import http from "../../config/axios.config";

/**
 * Handles server request for signup
 * @param {object} data
 * @param {DOMElement} submitButton
 */
export default (data, submitButton, historyObject) => async (dispatch, getState, { baseUrl }) => {
  try {
    const { data: result } = await http.post('/register', data);
    if (result.success) {
      handleAuthSuccessServerCall(dispatch, result, historyObject);
      closeAuthFormModal(submitButton);
    }
  } catch (error) {}
};
