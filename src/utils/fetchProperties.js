import axios from "axios";
// import http from "../config/axios.config";

import propertyActions from '../store/actions/propertyActions';


const fetchProperties = async (dispatch) => {
  const res = await axios.get('https://staging.newhomes.ng/api/police/all-properties');
  // console.log(res)
  if (dispatch) dispatch(propertyActions.setProperties(res.data.data))
  return res;
};

export default fetchProperties;
