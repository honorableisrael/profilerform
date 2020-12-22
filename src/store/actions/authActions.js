import axios from "axios";
import setAuthToken from "./../../utils/setAuthToken";
// import jwt_decode from "jwt-decode";

import { CLEAR_AFFORDABILITY, CLEAR_CURRENT_USER, CLEAR_EARNINGS, CLEAR_ERRORS, CLEAR_REQUEST, IS_LOADING, USER_AFFORDABILITY_URL } from "../../constants";
import errorTypes from "../types/errorTypes";
import authTypes from "../types/authTypes";
import { API } from "../../config";
import userTypes from "../types/userTypes";
import {BASE_URL, LOGIN_PAGE_URL, REGISTER_URL, FORGOT_PASSWORD_URL, CHANGE_PASSWORD_CODE_URL} from "../../constants";
import userActions from "./userActions";
import { batchDispatcher } from '../../utils/applicationBatchDispatchHelper';
import http from "../../config/axios.config";
import affordabilityTypes from "../types/affordabilityTypes";


// Register User
export const registerUser = (userData, history) => (dispatch) => {
    axios
      .post(`${BASE_URL}${REGISTER_URL}`, userData)
      .then((res) => history.push(`${LOGIN_PAGE_URL}`))
      .catch((err) =>
        dispatch({
          type: errorTypes.SET_ERRORS,
          payload: err.response,
        })
      );
  };

//Login User
export const loginUser = (userData) => dispatch => {

  axios
    .post(`${BASE_URL}${LOGIN_PAGE_URL}`, userData)
    .then(res => {
        //Save to local storage
        console.log(res.data)
        const {user} = res.data.data;
        const {token} = res.data.data;
        // Set token to local storage
        localStorage.setItem("token" , token);
        localStorage.setItem("user", JSON.stringify(user));
              // Set token to local storage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("loggedInDetails",JSON.stringify(res.data.data));
      return window.location.assign("/userdashboard")
        //Set Token to  Auth Header
        setAuthToken(token);
        //set Current User
        console.log(user);
        dispatch(setCurrentUser(user));
        // batchDispatcher(userActions[userTypes]=(user))
        // batchDispatcher(userTypes, userActions, dispatch, {payload: user});
    })
    .catch(err => {
      dispatch(setErrorLoading());
      dispatch({
        type: errorTypes.SET_ERRORS,
        payload: err.response
      })
    })
}

//Affordability test
export const affordabilityTest = (userData) => dispatch =>{
  axios
  .post(`${BASE_URL}${USER_AFFORDABILITY_URL}`, userData)
  .then(res => {
      console.log(res.data);
      dispatch({
        type: affordabilityTypes.SET_MAX_LOANABLE_AMOUNT,
        payload: res.data.loanable_amount
      });
      dispatch({
        type: affordabilityTypes.SET_MONTHLY_REPAYMENT,
        payload: res.data.monthly_repayment
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

//send password reset email
export const forgotPassword = (userData) => dispatch =>{
    axios
    .post(`${BASE_URL}${FORGOT_PASSWORD_URL}`, userData)
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
export const resetPassword = (userData) => dispatch =>{
    return axios
        .post(`${BASE_URL}${CHANGE_PASSWORD_CODE_URL}`, userData)
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
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        //Remove auth header for future requests
        setAuthToken(false);
        //set Current User to {} which will set isAuthenticated to false
        dispatch({type: CLEAR_CURRENT_USER});
        dispatch({type: CLEAR_EARNINGS});
        dispatch({type: CLEAR_REQUEST});
        dispatch({type: CLEAR_ERRORS});
        dispatch({type: CLEAR_AFFORDABILITY});
}