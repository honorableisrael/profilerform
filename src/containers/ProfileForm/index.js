import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProfileForm from './ProfileForm';
import EmploymentForm from './EmploymentForm';
// import AffordabilityForm from './../NewAffordabilityForm';
import styled from '@emotion/styled';
import http from '../../config/axios.config';
import { BASE_URL } from '../../constants';
import axios from 'axios';


const Wrapper = styled.div`
  form {
    padding-top: 20px;
  }
  .top-headers > h4 > span{
    font-weight: 700;
    
    line-height: 21.91px;
  }
`;

const ProfileFormWrapper = ({ setActiveTab, auth }) => {
  const [activeForm, setActiveForm] = useState(0);
  const [ranks, setRanks] = useState([]);
  const goToNextComponent = () => setActiveForm(activeForm + 1);
  const goToPreviousComponent = () => setActiveForm(activeForm - 1);
  
  const ActiveComponent = [ProfileForm, EmploymentForm][activeForm];
  const goToRequest = () => {
    setActiveTab(1);
  }

  useEffect(() => {
    (async () => {
      try {
        const { data: { data: ranks } } = await axios.get(`${BASE_URL}/general/ranks`);
        setRanks(ranks);        
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  // const {user} = props.auth;
  // const {firstname} = props.auth.user;

  return (
    <Wrapper>
      <div className='top-headers'>
        {/* <span>{['Profile Info', 'Employment Info'][activeForm]}</span> */}
        <h4>Hi <span>{auth.currentUser.firstname} {auth.currentUser.lastname}</span></h4>
      </div>
      <ActiveComponent
        {...{ goToNextComponent, goToPreviousComponent, ranks, goToRequest }}
      />
    </Wrapper>
  );
}

ProfileFormWrapper.propTypes ={
  auth: PropTypes.object.isRequired
}
const mapStateToProps = (state)=>({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ProfileFormWrapper);