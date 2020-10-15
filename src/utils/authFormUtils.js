import {
  DASHBOARD_URL, PENDING_DESTINATION, LENDER_DASHBOARD_URL, ADMIN_DASHBOARD_URL, LOGIN_PAGE_URL, NON_PROTECTED_ROUTES
} from "../constants";
import setIsAuthenticated from "../store/actions/setIsAuthenticated";
import setErrors from "../store/actions/setErrors";
import BrowserStorage from "./browserStorageUtils";
import { clearErrorStore } from "./errorUtils";
import http from '../config/axios.config.js';

/**
 * Helps handle invalid event of input elements
 * @param {DOMEvent} event
 * @param {DOMElement} errorElement
 */
export const handleInvalid = (event, errorElement) => {
  event.preventDefault();
  const { target } = event;
  target.setCustomValidity('');
  // Remove class name "hide" to show error message at the base
  errorElement.classList.remove('hide');
};

/**
 * Handles the change event of input elements in the authentication forms
 * @param {DOMEvent} event
 * @param {object} component
 */
export const handleChange = async ({ target }, component) => {
  const { dataset: { stateName }, value } = target;
  if (target.type === 'checkbox') {
    component.setState({ [stateName]: !component.state[stateName] });
    return;
  }

  await component.setState({ [stateName]: value });
};

/**
 * Handles success cases for all calls to the authentication endpoints of the server
 * @param {function} dispatch
 * @param {object} result
 * @param {object} historyObject
 * @param {string} pendingDestination
 */
export const handleAuthSuccessServerCall = (dispatch, result, historyObject, avoidRedirect) => {
  // Get data from result
  const { data: { token, user } } = result;
  BrowserStorage.setUserToken(token);
  BrowserStorage.setUserData(user);
  http.defaults.headers.Authorization = `Bearer ${token}`;
  const pendingDestination = BrowserStorage.getItem(PENDING_DESTINATION);
  dispatch(setIsAuthenticated(true));
  clearErrorStore();
  const action = historyObject.location.pathname === '/auth/login' ? historyObject.replace : historyObject.push;
  const usertype = user.usertype.toLowerCase();
  // If user was trying to access a url before login, then navigate to that page
  // else go to the dashboard
  if (!avoidRedirect) {
    if (pendingDestination) {
      BrowserStorage.removeItem(PENDING_DESTINATION);
      action(pendingDestination);
    } else if (usertype === 'lender') action(LENDER_DASHBOARD_URL);
    else if (usertype === 'admin') action(ADMIN_DASHBOARD_URL);
    else action(DASHBOARD_URL);
  }
};

/**
 * Closes one of login or signup form
 * @param {object} element 
 */
export const closeAuthFormModal = (element) => {
  element.closest('div.modal-content').querySelector('a.close').click();
}

/**
 * Handles user redirects when authentication fails
 * @param {object} historyObject
 * @param {function} setIsAuthenticated
 */
export const redirectUserWhenNotLoggedIn = (historyObject, setIsAuthenticated) => {
  const { replace, location: { pathname } } = historyObject;
  if (NON_PROTECTED_ROUTES.includes(pathname.toLowerCase())) return;
  BrowserStorage.setItem(PENDING_DESTINATION, pathname);
  replace(LOGIN_PAGE_URL);
  setIsAuthenticated(false);
};

export const validateForm = (event) => {
  event.preventDefault();
  const { target } = event;
  target.classList.add("was-validated");
  return target.querySelector("input:invalid, select:invalid");
};
