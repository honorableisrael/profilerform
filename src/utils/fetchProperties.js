import Axios from "axios";

import propertyActions from '../store/actions/propertyActions';


const fetchProperties = async (loan_amount, location, dispatch) => {
  const res = await Axios.get(
    `https://account.newhomes.ng/api/properties/showbyprice/${
      loan_amount}${location ? `/${location}` : ''}`
    );
  if (dispatch) dispatch(propertyActions.setProperties(res.data.data))
  return res;
};

export default fetchProperties;
