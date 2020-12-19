import axios from "axios";
import setAuthToken from "./../../utils/setAuthToken";
// import jwt_decode from "jwt-decode";

import { IS_LOADING } from "../../constants";
import errorTypes from "../types/errorTypes";
import authTypes from "../types/authTypes";
import { API } from "../../config";


// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("https://admin.newhomes.ng/api/auth/register", userData)
    .then((res) => history.push("/auth/login"))
    .catch((err) =>
      dispatch({
        type: errorTypes.SET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login User
export const loginUser = (userData) => dispatch => {

  axios
    .post(`${API}/auth/login`, userData)
    .then(res => {
      //Save to local storage
      // console.log(res.data)
      const { user } = res.data.data;
      const { token } = res.data.data;
      // Set token to local storage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("loggedInDetails",JSON.stringify(res.data.data));
      return window.location.assign("/userdashboard")
      //Set Token to  Auth Header
      setAuthToken(token);
      // //Decode token to get user data
      // const decoded = jwt_decode(token);
      //set Current User
      dispatch(setCurrentUser(user));
    })
    .catch(err => {
      dispatch(setErrorLoading());
      dispatch({
        type: errorTypes.SET_ERRORS,
        payload: err?.response?.data
      })
    })
}

//send password reset email
export const forgotPassword = (userData) => dispatch => {
  axios
    .post("https://admin.newhomes.ng/api/auth/forgot-password", userData)
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: authTypes.FORGOT_PASSWORD,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(setErrorLoading());
      dispatch({
        type: errorTypes.SET_ERRORS,
        payload: err.response
      })
    })
}

//Set new password
export const resetPassword = (userData) => dispatch => {
  return axios
    .post("https://admin.newhomes.ng/api/auth/change-password-code", userData)
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: authTypes.RESET_PASSWORD,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(setErrorLoading());
      dispatch({
        type: errorTypes.SET_ERRORS,
        payload: err.response
      })
    })
}

///Error loading
export const setErrorLoading = () => {
  return {
    type: IS_LOADING,
  };
};

//Set logged in user
export const setCurrentUser = (user) => {
  return {
    type: authTypes.SET_CURRENT_USER,
    payload: user
  }
}

//Logout User
export const logoutUser = () => dispatch => {
  //Remove token from local storage
  localStorage.removeItem("jwtToken");
  //Remove auth header for future requests
  setAuthToken(false);
  //set Current User to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

}