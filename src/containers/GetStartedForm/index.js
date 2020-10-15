import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


import userActions from '../../store/actions/userActions';
import userTypes from '../../store/types/userTypes';
import cookies from '../../utils/cookies';


const GetStartedForm = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    cookies.set('email', email);
    dispatch(userActions[userTypes.SET_EMAIL](email));
    history.push('/get-started');
  };

  return (
    <form className="get-started" onSubmit={handleSubmit}>
		  <input
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={({ target: { value } }) => setEmail(value)}
        required
      />
		  <button type="submit">
        Get Started
      </button>
    </form>
  );
}
 
export default GetStartedForm;