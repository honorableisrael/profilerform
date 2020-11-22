import React from 'react'
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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


const Wrapper = styled.div`

`;

const homeTypes = ['owned', 'rented', 'others'];
const maritalStatuses = ['married', 'single', 'divorce'];
const sexes = ['male', 'female'];

const validationSchema = Yup.object().shape({
  // sex: validations.requiredString,
  phone: validations.phone,
  address: validations.requiredString,
  // middlename: validations.isSingleName,
  lastname: validations.isRequiredSingleName,
  state_of_origin: validations.requiredString,
  firstname: validations.isRequiredSingleName,
  dob: validations.date,
  email: validations.email,
  mode_of_contact: validations.requiredString,
  no_of_dependents: validations
    .requiredInteger.min(0, 'Minimum of zero'),
  // password: validations.password,
  // whatapp: validations.phone.notRequired(),
  marital_status: validations.requiredString,
  current_apartment_status: validations.requiredString,
})


const ProfileForm = ({ dispatch, ranks, currentUser, goToNextComponent }) => {
  const email = cookies.get('email') || '';
  const handleSubmit = async (values) => {
    try {
      batchDispatcher(values, userActions, dispatch);
      goToNextComponent();
    } catch (error) {
      console.log(error.message);
    }
  };
  const userClone = {...currentUser};
  delete userClone.employment_id; delete userClone.employment_present_position;
  delete userClone.state; delete userClone.work_experience; delete userClone.year_to_retirement;
  delete userClone.work_experience; delete userClone.profession; delete userClone.employer_address;
  delete userClone.employment_state;

  return (
    <Wrapper>
      {/* <NewDatePicker /> */}
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={{...userClone, email: userClone.email || email}}
      >
        {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => {
          const states = statesList['160'] || [];
          const { current_apartment_status } = values;
          const isNotOtherHometype = homeTypes.slice(0, 2).includes(current_apartment_status);
          return (
            <Form className="form__main">
              <div className='container'>
                <div className="fp-personal-info-form">
                  <div>
                    <div>
                      <p className="mt-2">
                        Tell us about yourself
                      </p>
                      <div className=" row">
                        <div className="col-md-6 col-sm-12 form-group">
                          
                          <WrappedInputWithError
                            type="text"
                            name='firstname'
                            value={values.firstname}
                            placeholder=""
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            First Name
                            <sup>*</sup>
                          </label>
                        </div>
                        <div className="col-md-6 col-sm-12 form-group">
                          
                          <WrappedInputWithError
                            type="text"
                            name='lastname'
                            placeholder=""
                            value={values.lastname}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Last Name
                            <sup>*</sup>
                          </label>
                        </div>

                        {/* <div className="col-md-6 col-sm-12">
                          <label>Middle Name</label>
                          <WrappedInputWithError
                            type="text"
                            name='middlename'
                            placeholder="Middle name..."
                            value={values.middlename}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div> */}
                      </div>

                      <div className='row'>
                        <div className='col-md-12 form-group'>
                          
                          <WrappedInputWithError
                            type="text"
                            placeholder=""
                            name="address"
                            value={values.address}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Address
                            <sup>*</sup>
                          </label>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12 form-group'>
                          
                          <WrappedInputWithError
                            type="email"
                            name="email"
                            value={values.email}
                            placeholder=""
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Email
                            <sup>*</sup>
                          </label>
                        </div>

                        <div className='col-md-6 col-sm-12 form-group'>
                          
                          <WrappedInputWithError
                            type="text"
                            name='phone'
                            value={values.phone}
                            placeholder=""
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Phone Number
                            <sup>*</sup>
                          </label>
                        </div>
                      </div>

                      <div className='row'>                      
                        {/* <div className='col-md-6 col-sm-12'>
                          <label>
                            Sex
                            <sup>*</sup>
                          </label>
                          <WrappedSelectWithError
                            name='sex'
                            options={sexes}
                            value={values.sex}
                            placeholder='Sex...'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div> */}
                        <div className='col-md-6 col-sm-12 form-group'>
                        
                          <WrappedInputWithError
                            name='dob'
                            placeholder="DD/MM/YYYY"
                            value={values.dob}
                            // append={<FontAwesomeIcon color='gray' icon={faCalendarAlt} />}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Date of birth
                            <sup>*</sup>
                          </label>
                        </div>
                        <div className='col-md-6 col-sm-12 form-group'>
                          
                          <WrappedSelectWithError
                            textKey='name'
                            options={states}
                            name='state_of_origin'
                            value={values.state_of_origin}
                            extractValue={({ name }) => name}
                            placeholder=''
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            State of Origin
                            <sup>*</sup>
                          </label>
                        </div>
                        {/* <div className='col-md-6 col-sm-12'>
                          <label>
                            Whatsapp Number
                            <sup>*</sup>
                          </label>
                          <WrappedInputWithError
                            type="text"
                            name='whatapp'
                            value={values.whatapp}
                            placeholder="09011223344"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div> */}
                      </div>
                      {/* <div className='row'>
                        <div className='col-md-12'>
                          <label>Marital Status</label>
                          <div className="row">
                            {
                              maritalStatuses.map((status, index) => (
                                <div
                                  md="4"
                                  key={index}
                                  className='col-4'
                                >
                                  <input
                                    type="radio"
                                    value={status}
                                    name="marital_status"
                                    className="form-radio"
                                    checked={status === values.marital_status}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    {...{ errors, touched }}
                                    required
                                  />
                                  <label className="text--capitalize">{ toTitleCase(status) }</label>
                                  {getErrorMsg('marital_status', errors, touched)}
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-12'>
                          <label>Current home type</label>
                          <div className="row">
                            {
                              homeTypes.map((type, index) => {
                                return (
                                  <div key={index} className="col-4">
                                    <input
                                      type="radio"
                                      value={type}
                                      className="form-radio"
                                      name='current_apartment_status'
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      checked={
                                        isNotOtherHometype ? current_apartment_status === type : type === homeTypes[2]
                                      }
                                    />
                                    <label className="text--capitalize">{ toTitleCase(type) }</label>
                                  </div>
                                );
                              })
                            }
                          </div>
                        </div>
                        {getErrorMsg('current_apartment_status', errors, touched)}
                      </div>
                      <div className='row'>
                        {
                          !isNotOtherHometype ? (
                            <div className='col-md-6 col-sm-12'>
                              <label>If others, please specify</label>
                              <WrappedInputWithError
                                type="text"
                                name="current_apartment_status"
                                value={current_apartment_status}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                {...{ errors, touched }}
                              />
                            </div>

                          ) : ''
                        }
                      </div> */}
                      <div className='row'>                      
                        <div className='col-md-6 col-sm-12 form-group'>
                          
                          <WrappedSelectWithError
                            name='marital_status'
                            options={[
                              'Married',
                              'Single',
                              'Divorce'
                            ]}
                            value={values.marital_status}
                            placeholder=''
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Marital Status
                            <sup>*</sup>
                          </label>
                        </div>
                        <div className='col-md-6 col-sm-12 form-group'>
                          
                          <WrappedSelectWithError
                            name='current_home_type'
                            options={[
                              'Owned',
                              'Rented',
                              'Others'
                            ]}
                            value={values.current_home_type}
                            placeholder=''
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Current Home Type
                            <sup>*</sup>
                          </label>
                        </div>
                      </div>
                      <div className='row'>                      
                        <div className='col-md-6 col-sm-12 form-group'>
                          
                          <WrappedSelectWithError
                            name='mode_of_contact'
                            options={[
                              'SMS',
                              'Email',
                              'Phone call',
                              'Whatsapp'
                            ]}
                            value={values.mode_of_contact}
                            placeholder=''
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Preferred Mode of Contact
                            <sup>*</sup>
                          </label>
                        </div>
                        <div className='col-md-6 col-sm-12 form-group'>
                          
                          <WrappedInputWithError
                            type='number'
                            name='no_of_dependents'
                            value={values.no_of_dependents}
                            placeholder='e.g. 3'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                            className="form-control form-control-lg form-area"
                          />
                          <label className="form-label">
                            Number of Dependents
                            <sup>*</sup>
                          </label>
                        </div>
                        {/* <div className='col-md-6 col-sm-12'>
                          <label>
                            Password
                          </label>
                          <WrappedInputWithError
                            type="password"
                            name='password'
                            value={values.password}
                            placeholder="Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row mt-5'>
                  <div className="col-12">
                    <button
                      type="submit"
                      className='w-100'
                      disabled={isSubmitting}
                    >
                      {
                        isSubmitting ? (
                          <ButtonSpinner />
                        ) : 'continue'
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
}

const mapStateToProps = ({ currentUser }, ownProps) => ({ currentUser, ...ownProps });
 
export default connect(mapStateToProps)(ProfileForm);