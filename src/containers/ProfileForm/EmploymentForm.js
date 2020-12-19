import React from 'react';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import { toTitleCase } from '../../utils/dashboardUtils';
import { getErrorMsg, validations } from '../../utils/yupUtils';
import WrappedInput, { WrappedInputWithError, WrappedSelectWithError } from '../WrappedInput';
import { requiredFieldErrorMessage } from '../../utils/validationMessageUtils';
import { batchDispatcher } from '../../utils/applicationBatchDispatchHelper';
import ButtonSpinner from '../ButtonSpinner';
// import postApplication from './postApplication';
import { Formik, Form  } from 'formik';
import statesList from '../../utils/statesMapped';
import cookies from '../../utils/cookies';
import userActions from '../../store/actions/userActions';
import "./../../commons/TextFieldGroup/ProfileTextField.css";
import { BASE_URL, USER_PROFILE_URL } from '../../constants';
import axios from 'axios';
import http from '../../config/axios.config';
import isEmpty from './../../validation/is_Empty';


const Wrapper = styled.div`

`;

const minOneError = 'Minimum of a year'
const validationSchema = Yup.object().shape({
  employment_id: validations.requiredString,
  employment_present_position: validations.requiredString,
  // command: validations.requiredString,
  nhf_registration_number: validations.requiredString,
  employment_state: validations.requiredString,
  employer_address: validations.requiredString,
  work_experience: validations.requiredInteger.min(1, minOneError),
  year_to_retirement: validations.requiredInteger.min(1, minOneError),
})

const EmploymentForm = ({ dispatch, ranks, currentUser, backUser , goToPreviousComponent, goToRequest }) => {
  // const email = cookies.get('email');
  const handleSubmit = async (values) => {
    // const valuesCloned = {...values};
    // valuesCloned.have_equity = Number(valuesCloned.have_equity === 'yes');
    // valuesCloned.down_payment = valuesCloned.equity_contribution;
    // delete valuesCloned.budget;
    // delete valuesCloned.payment_option;
    // delete valuesCloned.equity_contribution;
    
    try { 
      const { data: { data: { token } }} = await axios.post(
      `${BASE_URL}${USER_PROFILE_URL}`,
      {...currentUser, ...values}
    );
    // if (token) {
    //   cookies.set('token', token);
    //   http.defaults.headers.Authorization = `Bearer ${token}`;
    // }
    batchDispatcher(values, userActions, dispatch);
    // goToNextComponent();
    goToRequest();
    } catch (error) {
    console.log(error.message);
    }
  };

  return (
    <Wrapper className="container">
      {/* <NewDatePicker /> */}
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={{
          employment_id: currentUser.employment_id ? currentUser.employment_id : (!isEmpty(backUser.employment_id) ? backUser.employment_id : ""),
          employment_present_position: currentUser.employment_present_position ? currentUser.employment_present_position : (!isEmpty(backUser.employment_present_position) ? backUser.employment_present_position : ""),
          nhf_registration_number: currentUser.nhf_registration_number ? currentUser.nhf_registration_number : (!isEmpty(backUser.nhf_registration_number) ? backUser.nhf_registration_number : ""),
          work_experience: currentUser.work_experience ? Number(currentUser.work_experience) : (!isEmpty(backUser.work_experience) ? Number(backUser.work_experience) : ""),
          employment_state: currentUser.employment_state ? currentUser.employment_state : (!isEmpty(backUser.employment_state) ? backUser.employment_state : ""),
          employer_address: currentUser.employer_address ? currentUser.employer_address : (!isEmpty(backUser.employer_address) ? backUser.employer_address : ""),
          year_to_retirement: currentUser.year_to_retirement ? Number(currentUser.year_to_retirement) : (!isEmpty(backUser.year_to_retirement) ? Number(backUser.year_to_retirement) : ""),
        }}
        // initialValues={{
        //   ...(() => {
        //     const {
        //       employment_id, employment_present_position, nhf_registration_number, 
        //       employment_state, employer_address, 
        //     } = currentUser;

        //     return {
        //       employment_id, employment_present_position, nhf_registration_number, 
        //       employment_state, employer_address, 
        //     };
        //   })(),
        //   year_to_retirement: Number(currentUser.year_to_retirement),
        //   work_experience: Number(currentUser.work_experience),
        // }}
       
      >
        {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => {
          const states = statesList['160'] || [];
          return (
            <Form>
              <div className='container'>
                <div className="fp-personal-info-form">
                  <div>
                    <div>
                      <p className="mt-2">
                        Provide your Employment Information
                      </p>
                     
                      <div className= "row">
                        <div className="col-md-6 col-sm-12 form-group">
                          <WrappedInputWithError
                            type="text"
                            onBlur={handleBlur}
                            name='employment_id'
                            placeholder=""
                            onChange={handleChange}
                            value={values.employment_id}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            F/AP Number
                            <sup>*</sup>
                          </label>
                          
                        </div>
                        <div className="col-md-6 col-sm-12 form-group">
                          
                          <WrappedInputWithError
                            type="text"
                            name='employer_address'
                            placeholder=""
                            value={values.employer_address}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Command
                            <sup>*</sup>
                          </label>
                        </div>
                        </div>

                        <div className= "row">
                        <div className="col-md-6 col-sm-12 form-group ">
                          
                          <WrappedSelectWithError
                            name='employment_present_position'
                            textKey='name'
                            value={values.employment_present_position}
                            extractValue={({ name }) => name}
                            options={[{ name: 'Select a choice' }, ...ranks]}
                            // options={[
                            //   'Officer',
                            //   'Inspector',
                            //   'DPO'
                            // ]}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">Rank</label>
                        </div>
                        <div className="col-md-6 col-sm-12 form-group ">
                          
                          <WrappedInputWithError
                            type="text"
                            name='nhf_registration_number'
                            placeholder=""
                            value={values.nhf_registration_number}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">NHF Number</label>
                        </div>
                        </div>
                      {/* </div> */}
                      {/* <div className='row form-group'>                       */}
                        {/* <div className='col-12'>
                          <label>
                            Employment Address
                            <sup>*</sup>
                          </label>
                          <WrappedInputWithError
                            type='text'
                            name='employer_address'
                            placeholder='Employment address'
                            value={values.employer_address}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div> */}
                        <div className= "row">
                        <div className='col-md-6 col-sm-12 form-group'>
                          
                          <WrappedSelectWithError
                            textKey='name'
                            // options={states}
                            options={[{ option: 'Select a State' }, ...states]}
                            name='employment_state'
                            value={values.employment_state}
                            extractValue={({ name }) => name}
                            placeholder=''
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            State of Deployment
                            <sup>*</sup>
                          </label>
                        </div>
                        <div className='col-md-6 col-sm-12 form-group'>
                          
                          <WrappedInputWithError
                            type="number"
                            append='Years'
                            name='work_experience'
                            value={values.work_experience}
                            placeholder="years"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area2"
                          />
                          <label className="form-label">
                            Length of Service
                            <sup>*</sup>
                          </label>
                        </div>
                        </div>
                        <div className= "row">
                        <div className='col-md-6 col-sm-12 form-group'>
                          
                          <WrappedInputWithError
                            type="number"
                            append='Years'
                            name='year_to_retirement'
                            value={values.year_to_retirement}
                            placeholder="years"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area2"
                          />
                          <label className="form-label">
                            Years to Retirement
                            <sup>*</sup>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6 px-3'>
                    <button
                      type='button'
                      disabled={isSubmitting}
                      className='w-150 mb-3'
                      onClick={goToPreviousComponent}
                    >
                      Previous
                    </button>
                  </div>
                  <div className="col-md-6 px-3">
                    <button
                      type="submit"
                      className='w-100'
                      disabled={isSubmitting}
                    >
                      {
                        isSubmitting ? <ButtonSpinner /> : 'Continue'
                      }
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

const mapStateToProps = ({ auth, currentUser }, ownProps) => ({
  currentUser: { ...currentUser} , backUser : {...auth.currentUser }, ...ownProps
});
 
export default connect(mapStateToProps)(EmploymentForm);