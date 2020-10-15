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


const Wrapper = styled.div`

`;

const minOneError = 'Minimum of a year'
const validationSchema = Yup.object().shape({
  employment_id: validations.requiredString,
  employment_present_position: validations.requiredString,
  command: validations.requiredString,
  employment_state: validations.requiredString,
  employer_address: validations.requiredString,
  work_experience: validations.requiredInteger.min(1, minOneError),
  year_to_retirement: validations.requiredInteger.min(1, minOneError),
})

const EmploymentForm = ({ dispatch, ranks, currentUser, goToPreviousComponent, goToRequest }) => {
  // const email = cookies.get('email');
  const handleSubmit = async (values) => {
    batchDispatcher(values, userActions, dispatch);
    goToRequest();
  };

  return (
    <Wrapper>
      {/* <NewDatePicker /> */}
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          employment_id: currentUser.employment_id,
          employment_present_position: currentUser.employment_present_position,
          command: currentUser.command,
          work_experience: currentUser.work_experience,
          employment_state: currentUser.employment_state,
          employer_address: currentUser.employer_address,
          year_to_retirement: currentUser.year_to_retirement,
        }}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => {
          const states = statesList['160'] || [];
          return (
            <Form>
              <div className='container'>
                <div className="fp-personal-info-form">
                  <div>
                    <div>
                      <h2 className="mt-3">
                        Please tell us about your employment
                      </h2>
                      <div className="form-group row">
                        <div className="col-md-6 col-sm-12">
                          <label>
                            Police ID
                            <sup>*</sup>
                          </label>
                          <WrappedInputWithError
                            type="text"
                            name='employment_id'
                            value={values.employment_id}
                            placeholder="Police ID"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <label>
                            Command
                            <sup>*</sup>
                          </label>
                          <WrappedInputWithError
                            type="text"
                            name='command'
                            placeholder="Command"
                            value={values.command}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div>

                        <div className="col-md-6 col-sm-12">
                          <label>Rank</label>
                          <WrappedSelectWithError
                            name='employment_present_position'
                            textKey='name'
                            value={values.employment_present_position}
                            extractValue={({ name }) => name}
                            options={[{ name: 'Select a choice' }, ...ranks]}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div>
                      </div>
                      <div className='row'>                      
                        <div className='col-12'>
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
                        </div>
                        <div className='col-md-4 col-sm-12'>
                          <label>
                            State of Deployment
                            <sup>*</sup>
                          </label>
                          <WrappedSelectWithError
                            textKey='name'
                            options={states}
                            name='employment_state'
                            value={values.employment_state}
                            extractValue={({ name }) => name}
                            placeholder='Please choose a state'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div>
                        <div className='col-md-4 col-sm-12'>
                          <label>
                            Length of Service
                            <sup>*</sup>
                          </label>
                          <WrappedInputWithError
                            type="number"
                            append='years'
                            name='work_experience'
                            value={values.work_experience}
                            placeholder="Length of service"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div>
                        <div className='col-md-4 col-sm-12'>
                          <label>
                            Years to Retirement
                            <sup>*</sup>
                          </label>
                          <WrappedInputWithError
                            type="number"
                            append='years'
                            name='year_to_retirement'
                            value={values.year_to_retirement}
                            placeholder="Years to retirement"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row mt-5'>
                  <div className='col-md-6 px-3'>
                    <button
                      type='button'
                      disabled={isSubmitting}
                      className='w-100 item-btn mb-3'
                      onClick={goToPreviousComponent}
                    >
                      back
                    </button>
                  </div>
                  <div className="col-md-6 px-3">
                    <button
                      type="submit"
                      className='w-100'
                      disabled={isSubmitting}
                    >
                      {
                        isSubmitting ? <ButtonSpinner /> : 'submit'
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

const mapStateToProps = ({ currentUser }, ownProps) => ({ currentUser, ...ownProps });
 
export default connect(mapStateToProps)(EmploymentForm);