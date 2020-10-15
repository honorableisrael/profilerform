import { getUserInitialsAndFormattedFullname } from "./dashboardUtils";
import { USER_DATA, USER_TOKEN } from "../constants";

export default class BrowserStorage {
  /**
   * Sets the user token in the browser storage
   * @param {string} token
   */
  static setUserToken(token) {
    localStorage.setItem(USER_TOKEN, token);
  }

  /**
   * Sets the user data in the browser storage
    * @param {object} user
   */
  static setUserData(user) {
    const { firstname, lastname, usertype, email, phonenumber, address, dob, employment_status } = user;
    localStorage.setItem(USER_DATA, JSON.stringify({
      firstname, lastname, usertype, email, phonenumber, address, dob, employment_status
    }));
  }

  /**
  * Gets user data from sessionStorage
  * @returns {object} userData
  */
  static getUserData() {
    let userData = localStorage.getItem(USER_DATA);
    let usertype, firstname, lastname, initials = '',
    fullName = '', phonenumber = '', email = '', dob = '',
    address = '', employment_status = '';
    if (userData) {
      userData = JSON.parse(userData);
      usertype = userData.usertype.toLowerCase();
      firstname = userData.firstname;
      lastname = userData.lastname;
      email = userData.email;
      phonenumber = userData.phonenumber;
      dob = userData.dob;
      address = userData.address;
      employment_status = userData.employment_status;
      [initials, fullName] = getUserInitialsAndFormattedFullname(firstname, lastname);
    }

    return {
      usertype, firstname, lastname, initials, fullName, email, phonenumber, dob, address, employment_status
    };
  }

  /**
   * Retrieves the user token from browser storage
   */
  static getUserToken() {
    return localStorage.getItem(USER_TOKEN);
  }

  /**
   * Sets the value for an item
   * @param {string} key
   * @param {string} value
   */
  static setItem(key, value) {
    sessionStorage.setItem(key, value);
  }

  /**
  * Sets the value for an item
  * @param {string} key
  * @returns {string} value
  */
 static getItem(key) {
   return sessionStorage.getItem(key);
 }

  /**
   * Removes an item from the browser storage
   * @param {string} key
   */
  static removeItem(key) {
    sessionStorage.removeItem(key);
  }

  /**
   * Clears all stored value in the browser storage
   */
  static clear() {
    sessionStorage.clear();
    localStorage.clear();
  }
}