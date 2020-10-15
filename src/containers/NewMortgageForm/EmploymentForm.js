import React from 'react';
import * as Yup from 'yup';
import styled from '@emotion/styled'
import { connect, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';

import { getErrorMsg, validations } from '../../utils/yupUtils';
import { DEFAULT_RADIO_VALUES } from '../../constants';
import WrappedInput, { WrappedInputWithError } from '../WrappedInput';
import { toTitleCase } from '../../utils/dashboardUtils';
import { batchDispatcher } from '../../utils/applicationBatchDispatchHelper';
import applicationActions from '../../store/actions/applicationActions';
import ButtonSpinner from '../ButtonSpinner';
import postApplication from './postApplication';


const Wrapper = styled.div`
`;

const EmploymentForm = ({ firstname, age, goToPreviousComponent, goToNextComponent, companies, isNhf, ...rest }) => {
  const validationShape = {
    employer_email: validations.email,
    employer_phone: validations.phone,
    work_experience: validations.requiredInteger,
    employer_name: validations.requiredString,
    employer_address: validations.requiredString,
    employment_is_confirmed: validations.requiredString,
    employment_present_position: validations.requiredString,
  };
  const dispatch = useDispatch();
  if (isNhf) validationShape.employer_nhf_registration_number = validations.requiredString;
  const validationSchema = Yup.object().shape(validationShape);

  const handleSubmit = async (values) => {
    const {
      employer_name, employer_email, employer_address,
      employer_nhf_registration_number, employer_phone,
      employment_present_position, employment_is_confirmed,
      year_to_retirement, work_experience
    } = values;
    const data = {
      employer_name, employer_email, employer_address,
      employer_phone, employment_present_position,
      employment_is_confirmed, year_to_retirement, work_experience
    };
    if (isNhf) data.employer_nhf_registration_number = employer_nhf_registration_number;
    batchDispatcher(data, applicationActions, dispatch);
    try {
      const res = await postApplication(data, rest.app_ref);
      goToNextComponent();
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Wrapper>
      <Formik
        initialValues={rest}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, handleBlur, isSubmitting, errors, touched }) => {
          return (
            <Form className="form">
              <div className='container'>
                <div className="fp-personal-info-form">
                  <div>
                    <div>
                      <span>Ordinary Mortgage | Personal Info</span>
                      <h2>
                        Nice to meet you{ firstname ? ` ${toTitleCase(firstname)}` : '' }! Moving on, please
                        tell me about your current employment situation.
                      </h2>
                      <div className='row'>
                        <div className={`employer-group col-sm-12 col-md-${isNhf ? 4 : 6}`}>
                          <label>Employer Name</label>
                          <WrappedInputWithError
                            type="text"
                            name='employer_name'
                            list='companies-list'
                            value={values.employer_name}
                            placeholder="Employer name..."
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                          <datalist id='companies-list'>
                            {
                              companies.map(({ id, name }) => (
                                <option key={id} value={name} />
                              ))
                            }
                          </datalist>
                        </div>
                        <div className={`col-sm-12 col-md-${isNhf ? 4 : 6}`}>
                          <label>Company Email</label>
                          <WrappedInputWithError
                            type="email"
                            name="employer_email"
                            value={values.employer_email}
                            placeholder="company@example.com"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div>
                        {
                          isNhf ? (
                            <div className='col-md-4 col-sm-12'>
                              <label>Employer NHF Registration Number</label>
                              <WrappedInputWithError
                                type="text"
                                placeholder="Employer NHF reg. number"
                                name="employer_nhf_registration_number"
                                value={values.employer_nhf_registration_number}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                {...{ errors, touched }}
                              />
                            </div>
                          ) : ''
                        }
                      </div>

                      <div className='row'>
                        <div className='col-md-12'>
                          <label>Employer Address</label>
                          <WrappedInputWithError
                            type="text"
                            name="employer_address"
                            value={values.employer_address}
                            placeholder="Employer address..."
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <label>Employer Phone No</label>
                          <WrappedInputWithError
                            type="text"
                            name="employer_phone"
                            value={values.employer_phone}
                            placeholder="Employer phone..."
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <label>Present Position</label>
                          <WrappedInputWithError
                            type="text"
                            placeholder="Present position..."
                            name="employment_present_position"
                            value={values.employment_present_position}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <label>Number of Years to Retirement</label>
                          <WrappedInput
                            type="number"
                            value={60 - age}
                            name="year_to_retirement"
                            placeholder="Years to Retirement"
                            disabled
                          />
                        </div>

                        <div className='col-md-6 col-sm-12'>
                          <label>Years at Current Employment</label>
                          <WrappedInputWithError
                            min="1"
                            type="number"
                            name="work_experience"
                            value={values.work_experience}
                            placeholder="Years employed..."
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-12'>
                          <label>Has your employment been confirmed?</label>
                          <div className="row">
                            {
                              DEFAULT_RADIO_VALUES.map((item, index) => {
                                const id = `employment_is_confirmed_${item}`;
                                return (
                                  <div className='col-6' key={index}>
                                    <input
                                      id={id}
                                      type="radio"
                                      value={item}
                                      className="form-radio"
                                      name="employment_is_confirmed"
                                      checked={item === values.employment_is_confirmed}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                    />
                                    <label className="text--capitalize" htmlFor={id}>{ toTitleCase(item) }</label>
                                  </div>
                                );
                              })
                            }
                            {getErrorMsg('employment_is_confirmed', errors, touched)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row mt-5'>
                  <div className='col-md-6 px-3'>
                    <button
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

const mapStateToProps = ({ application, affordability: { isNhf, age }, currentUser: { firstname } }, ownProps) => {
  const {
    employer_name, employer_email, employer_address,
    employer_nhf_registration_number, employer_phone,
    employment_present_position, employment_is_confirmed,
    year_to_retirement, work_experience, app_ref
  } = application;
  return {
    employer_name, employer_email, employer_address,
    employer_nhf_registration_number, employer_phone,
    employment_present_position, employment_is_confirmed,
    isNhf, year_to_retirement, work_experience, app_ref,
    firstname, age, ...ownProps
  };
};
 
export default connect(mapStateToProps)(EmploymentForm);