import authTypes from "../types/authTypes";
import isEmpty from "../../validation/is_Empty";

const initialState ={
    isAuthenticated: false,
    user: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authTypes.SET_CURRENT_USER: 
            return { 
                ...state, 
                isAuthenticated: !isEmpty(action.payload), 
                user: action.payload,
            };
        case authTypes.FORGOT_PASSWORD:
             return{
                 ...state, 
                user: action.payload,
            };
        case authTypes.RESET_PASSWORD:
                return{
                    ...state, 
                   user: action.payload,
               };
        default: 
            return state;
    }
}

export default authReducer;