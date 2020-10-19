import React, { useEffect, useState } from 'react';

import ProfileForm from './ProfileForm';
import EmploymentForm from './EmploymentForm';
import styled from '@emotion/styled';
import http from '../../config/axios.config';


const Wrapper = styled.div`
  form {
    padding-top: 32px;
  }
`;

const ProfileFormWrapper = ({ setActiveTab }) => {
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
        const { data: { data: ranks } } = await http.get('/general/ranks');
        setRanks(ranks);        
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <Wrapper>
      <div className='top-headers'>
        <span>{['Personal Info', 'Employment Info'][activeForm]}</span>
      </div>
      <ActiveComponent
        {...{ goToNextComponent, goToPreviousComponent, ranks, goToRequest }}
      />
    </Wrapper>
  );
}
 
export default ProfileFormWrapper;