import React, { useEffect, useState } from 'react';

import ProfileForm from './ProfileForm';
import EmploymentForm from './EmploymentForm';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import http from '../../config/axios.config';


const Wrapper = styled.div`
  & {
    display: flex;
    align-items: center;
    padding-top: 64px;
    flex-direction: column;
    position: relative;
  }

  & > div {
    max-width: 800px;
    margin: 0 auto;
    padding-top: 80px;
  }

  .top-headers {
    top: -40px;
    left: 64px;
    position: absolute;
    font-size: 1rem;
  }

  @media screen and (max-width: 633px) {
    .top-headers {
      left: 16px;
    }
  }

  h1 {
    font-weight: 700;
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const ProfileFormWrapper = () => {
  const history = useHistory();
  const [activeForm, setActiveForm] = useState(0);
  const [ranks, setRanks] = useState([]);
  const goToNextComponent = () => setActiveForm(activeForm + 1);
  const goToPreviousComponent = () => setActiveForm(activeForm - 1);
  
  const ActiveComponent = [ProfileForm, EmploymentForm][activeForm];
  const goToRequest = () => {
    history.push('/application/request');
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
        <h1>Police Property Request</h1>
        <span>{['Personal Info', 'Employment Info'][activeForm]}</span>
      </div>
      <ActiveComponent
        {...{ goToNextComponent, goToPreviousComponent, ranks, goToRequest }}
      />
    </Wrapper>
  );
}
 
export default ProfileFormWrapper;