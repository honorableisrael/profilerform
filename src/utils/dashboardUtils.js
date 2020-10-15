import BrowserStorage from "./browserStorageUtils";
import {WELCOME_PAGE_URL, BASE_URL} from "../constants";
import http from '../config/axios.config';

/**
 * Formats a string to titlecase, by setting the first letter to uppercase
 * @param {string} str
 * @returns {string} formatted string
 */
export const toTitleCase = str => {
  if (str) {
    return `${str[0].toUpperCase()}${str.length > 1 ? str.slice(1) : ""}`;
  }

  return str;
};

/**
 * Retrieves the full name and initials of a user from the first name and last name
 * @param {string} firstName
 * @param {string} lastName
 * @returns {array}
 */
export const getUserInitialsAndFormattedFullname = (firstName, lastName) => {
  let initials = "";
  let fullName = "";
  if (firstName) {
    initials += firstName[0].toUpperCase();
    fullName += `${toTitleCase(firstName)}`;
  }
  if (lastName) {
    initials += lastName[0].toUpperCase();
    fullName += ` ${toTitleCase(lastName)}`;
  }

  return [initials, fullName];
};

/**
 * Formats a date value built from the date string using date style in Intl.DateTimeFormat
 * @param {string|object} date
 * @param {string} dateStyle
 * @returns {string} formatted data
 */
export const formatDate = (date, dateStyle, timeStyle) => {
  if (!date) return date;
  const isString = typeof date === "string";
  let dateObject = isString ? new Date(date) : date;
  dateObject =
    dateObject.toString() === "Invalid Date" && isString
      ? new Date(date.replace(/-/g, "/"))
      : dateObject;
  try {
    let formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle,
      timeStyle
    }).format(dateObject);
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(formattedDate)) return formattedDate;
    return `${dateObject.getDate()}/${dateObject.getMonth() +
      1}/${dateObject.getFullYear()}`;
  } catch (error) {
    console.log(error.message);
    return "";
  }
};

/**
 * Handles log out everywhere
 * @param {function} setIsAuthenticated
 * @param {object} history
 */
export const logout = (setIsAuthenticated, history) => {
  setIsAuthenticated(false);
  BrowserStorage.clear();
  history.push(WELCOME_PAGE_URL);
};

/**
 * Fetches the record of application
 * @param {string} url
 * @returns {array} list of applications
 */
export const fetchApplications = async url => {
  const {data: {data}} = await http.get(url);
  return data;
};

export const fetchFiles = async () => {
  const {
    data: { data }
  } = await http.get('/user/required-documents');
  return data;
};

export const fetchApplicationData = async (url) => {
  const { data: { data } } = await http.get(url);
  console.log(data);
  return data;
};

export const cleanApplicationData = (applicationData) => {
  const emptyValues = [null, undefined, 'null'];
  Object.entries(applicationData).forEach(([k, v]) => {
    if ([
      'other_employments', 'outstanding_loans', 'user_assets', 'bank_accounts', 'children', 'other_source_of_income'
    ].includes(k)) {
      if (emptyValues.includes(v)) applicationData[k] = [];
      else applicationData[k] = JSON.parse(v);
     }
    else if (emptyValues.includes(v)) applicationData[k] = '';
    else if (k === 'next_of_kin_dob') {
      applicationData['next_of_kin_age'] = v;
      delete applicationData.next_of_kin_dob;
    }
  });
};

export const fetchExistingApplication = async (slug, setEditApplicationData) => {
  const { usertype } = BrowserStorage.getUserData();
  const url = `/${usertype}/application/view/${slug}`;
  const {application} = await fetchApplicationData(url);
  delete application.lender;
  delete application.user;
  cleanApplicationData(application);
  setEditApplicationData(application);
  return application;
};
