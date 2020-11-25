import { IS_LOADING } from "../../constants";
import errorTypes from "../types/errorTypes"
const initialState ={}

export default function(state= initialState, action){
  switch(action.type){
    case IS_LOADING:
        return {
          ...state,
          loading: true,
        };
    case errorTypes.SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      }
        ; 
    default:
      return state;
  }
}