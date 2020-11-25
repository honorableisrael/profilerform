import { handleAuthSuccessServerCall, closeAuthFormModal } from "../../utils/authFormUtils";
import http from "../../config/axios.config";


/**
 * Handles server request for login
 * @param {object} data
 * @param {DOMElement} submitButton
 * @param {object} historyObject
 * @param {string} destination
 */
export default (data, submitButton, historyObject) => async (dispatch) => {
  try {
    const { data: result } = await http.post('/auth/login', data);
    if (result.success) {
      handleAuthSuccessServerCall(dispatch, result, historyObject);
      closeAuthFormModal(submitButton);
    }
  } catch (error) {}
};