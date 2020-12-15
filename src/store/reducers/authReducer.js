import authTypes from "../types/authTypes";
import isEmpty from "../../validation/is_Empty";
import { CLEAR_CURRENT_USER, CLEAR_EARNINGS } from "../../constants";

const initialState ={
    isAuthenticated: false,
    currentUser: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authTypes.SET_CURRENT_USER: 
            return { 
                ...state, 
                isAuthenticated: !isEmpty(action.payload), 
                currentUser: action.payload,
            };
        case authTypes.FORGOT_PASSWORD:
             return{
                 ...state, 
                currentUser: action.payload,
            };
        case authTypes.RESET_PASSWORD:
                return{
                    ...state, 
                   currentUser: action.payload,
               };
        case CLEAR_CURRENT_USER: return initialState;
        case CLEAR_EARNINGS: return initialState;
        default: 
            return state;
    }
}

export default authReducer;