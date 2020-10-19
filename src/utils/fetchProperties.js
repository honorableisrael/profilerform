import Axios from "axios";
import http from "../config/axios.config";

import propertyActions from '../store/actions/propertyActions';


const fetchProperties = async (dispatch) => {
  const res = await http.get('police/all-properties');
  if (dispatch) dispatch(propertyActions.setProperties(res.data.data))
  return res;
};

export default fetchProperties;
