import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Axios from 'axios';
import { BASE_URL } from '../../constants';
import PersonalInfoFormStepOne from './PersonalInfoFormStepOne';
import EmploymentForm from './EmploymentForm';
import OtherInfoForm from './OtherInfoForm';
import LoanInfoStepForm from './LoanInfoStepForm';
import FinancialInfoStepFormOne from './FinancialInfoStepFormOne';
import ApplicationDetails from './ApplicationDetails';
import cookies from '../../utils/cookies';


const Wrapper = styled.div`
  label {
    display: block;
  }

  label,
  input,
  select,
  textarea {
    width: 100%;
  }

  input + label {
    width: unset;
    display: inline-block;
  }
`;

const NewMortgageForm = ({ setActiveTab }) => {
  const [banks, setBanks] = useState([]);
  const [idCards, setIdCards] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [activeComponentIndex, setActiveComponentIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await Promise.all([
          Axios.get(`${BASE_URL}/all-banks`), Axios.get(`${BASE_URL}/all-idcards`),
          Axios.get(`${BASE_URL}/all-companies`)
        ]);
        const [
          { data: { data: bankList } }, { data: { data: idCardsList } }, { data: { data: companiesList } }
        ] = res;
        
        setBanks(bankList);
        setIdCards(idCardsList);
        setCompanies(companiesList);
        const appRef = cookies.get('app_ref');
        if (appRef) {
          
        }
      } catch (error) { console.log(error.message); }
    })();
  }, []);

  const activeComponentDetails = [
    {
      component: PersonalInfoFormStepOne,
      props: {
        idCards,
        //nhf_registration_number
      }
    },
    {
      component: EmploymentForm,
      props: { companies }
    },
    {
      component: OtherInfoForm,
      props: {}
    },
    {
      component: FinancialInfoStepFormOne,
      props: {}
    },
    {
      component: LoanInfoStepForm,
      props: {}
    },
    {
      component: ApplicationDetails,
      props: {
        // setEditApplicationData,
        // nhf_registration_number,
        // goToRoute: this.$router.replace
      }
    }
  ][activeComponentIndex];

  const goToComponent = (index) => setActiveComponentIndex(index);
  const postStepApplication = () => {};
  const goToNextComponent = () => setActiveComponentIndex(activeComponentIndex + 1);
  const goToPreviousComponent = () => setActiveComponentIndex(activeComponentIndex - 1);
  const goToPreviewComponent = () => {};
  const ActiveComponent = activeComponentDetails.component;
  const props = {
    ...activeComponentDetails.props,
        setActiveTab,
        goToComponent,
        goToNextComponent,
        postStepApplication,
        goToPreviewComponent,
        //onChangeTab: (step) => this.$emit('change-tab', step),
        goToPreviousComponent,
        componentIndex: activeComponentIndex,
  };


  return (
    <Wrapper>
      <ActiveComponent
        {...props}
      />
    </Wrapper>
  );
}
 
export default NewMortgageForm;