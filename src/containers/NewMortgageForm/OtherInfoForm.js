import React from 'react'
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { connect, useDispatch } from 'react-redux';
import { Formik, Form, FieldArray } from 'formik';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { toTitleCase } from '../../utils/dashboardUtils';
import { getErrorMsg, validations } from '../../utils/yupUtils';
import WrappedInput, { WrappedInputWithError } from '../WrappedInput';
import { requiredFieldErrorMessage } from '../../utils/validationMessageUtils';
import { DEFAULT_RADIO_VALUES } from '../../constants';
import { batchDispatcher } from '../../utils/applicationBatchDispatchHelper';
import applicationActions from '../../store/actions/applicationActions';
import { formatCurrencyInput } from '../../utils/currencyUtils';
import ButtonSpinner from '../ButtonSpinner';
import postApplication from './postApplication';


const Wrapper = styled.div`
`;

const homeTypes = ['owned', 'rented', 'others'];
const maritalStatuses = ['married', 'single', 'divorce'];
const defaultChildObject = { name: '', age: '', relationship: '' };
const getNewChild = () => ({ id: new Date().getTime().toString(), ...defaultChildObject });
// const childrenConditionals = (validator) => ['have_children', {
//   is: value => value === DEFAULT_RADIO_VALUES[0],
//   then: validator
// }]

const validationSchema = Yup.object().shape({
  marital_status: validations.requiredString,
  annual_rent_value: validations.currencyFieldWithWhen(
    ['current_apartment_status', {
      is: value => homeTypes.slice(1).includes(value),
      then: Yup.number().required(requiredFieldErrorMessage)
    }]
  ),
  spouse_name: validations.isDoubleName,
  have_children: validations.requiredString,
  spouse_work_experience: validations.integer,
  spouse_annual_income: validations.currencyField,
  current_apartment_status: validations.requiredString,
  next_of_kin_age: validations.requiredInteger,
  next_of_kin_name: validations.isRequiredDoubleName,
  next_of_kin_address: validations.requiredString,
  next_of_kin_relationship: validations.requiredString,
  children: Yup.array().of(Yup.object().shape({
    // name: Yup.string().when(...childrenConditionals(validations.requiredString)),
    // age: Yup.number().when(...childrenConditionals(validations.requiredInteger)),
    // relationship: Yup.string().when(...childrenConditionals(validations.requiredString))
    age: validations.requiredInteger,
    name: validations.isRequiredDoubleName,
    relationship: validations.requiredString
  }))
});

const OtherInfoForm = ({ goToNextComponent, goToPreviousComponent, ...rest }) => {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    const {
      marital_status, annual_rent_value, current_apartment_status, spouse_name,
      spouse_address, spouse_employer, spouse_work_experience, spouse_profession,
      spouse_annual_income, children, next_of_kin_name, next_of_kin_relationship,
      next_of_kin_age, next_of_kin_address, have_children
    } = values;
    const data = {
      marital_status, annual_rent_value, current_apartment_status, spouse_name,
      spouse_address, spouse_employer, spouse_work_experience, spouse_profession,
      spouse_annual_income, children, next_of_kin_name, next_of_kin_relationship,
      next_of_kin_age, next_of_kin_address, have_children
    };
    const hasChildren = have_children === DEFAULT_RADIO_VALUES[1];
    data.children = hasChildren ? [] : children;
    batchDispatcher(data, applicationActions, dispatch);
    try {
      const res = await postApplication({...data, have_children: hasChildren}, rest.app_ref);
      goToNextComponent();
    } catch (error) {
      
    }
  };

  return (
    <Wrapper>
      <Formik
        initialValues={rest}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {
          ({ values, errors, touched, isSubmitting, handleBlur, handleChange, validateField }) => {
            const { current_apartment_status } = values;
            const isNotOtherHometype = homeTypes.slice(0, 2).includes(current_apartment_status);
            return (
              <Form className="form">
                <div className='container'>
                  <div className="fp-personal-info-form">
                    <div>
                      <div>
                        <span>Ordinary Mortgage | Personal Info</span>
                        <h2>
                          Hope you don’t mind me getting a little personal... Don’t
                          worry, it’s nothing outside what’s required.
                        </h2>

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
                                        onChange={({ target }) => {
                                          if (target.value === homeTypes[0]) {
                                            handleChange({ target: { name: 'annual_rent_value', value: '' } })
                                          }
                                          handleChange({ target });
                                        }}
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
                          {/* <!-- if others, the below form should be active otherwise hidden --> */}
                          {
                            !isNotOtherHometype ? (
                              <div className='col-md-5 col-sm-12'>
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
                          {/* <!-- if others end --> */}
                          {
                            current_apartment_status !== homeTypes[0] ? (
                              <div className='col-md-7 col-sm-12' v-if="current_apartment_status !== 'owned'" cols="12">
                                <label>Annual Rent</label>
                                <WrappedInputWithError
                                  withMargin
                                  type="text"
                                  prepend="₦"
                                  append="Annually"
                                  name="annual_rent_value"
                                  value={formatCurrencyInput(values.annual_rent_value)}
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

                        {/* <!-- if married, the below form group with class married should be
                        active otherwise hidden--> */}
                        {
                          values.marital_status === maritalStatuses[0] ? (
                            <div className='row'>
                              <div className='col-md-6 col-sm-12'>
                                <label>Spouse’s Name</label>
                                <WrappedInput
                                  type="text"
                                  name="spouse_name"
                                  value={values.spouse_name}
                                  placeholder="Spouse's name"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  {...{ errors, touched }}
                                />
                              </div>

                              <div className='col-md-6 col-sm-12'>
                                <label>Spouse’s Employer</label>
                                <WrappedInput
                                  type="text"
                                  name="spouse_employer"
                                  value={values.spouse_employer}
                                  placeholder="Spouse's employer"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  {...{ errors, touched }}
                                />
                              </div>
                              <div className='col-12 col-sm-6'>
                                <label>No of Years Employed</label>
                                <WrappedInputWithError
                                  min="1"
                                  withMargin
                                  type="number"
                                  placeholder="5"
                                  name="spouse_work_experience"
                                  value={values.spouse_work_experience}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  {...{ errors, touched }}
                                />
                              </div>
                              <div className='col-12 col-sm-6'>
                                <label>Profession of Spouse</label>
                                <WrappedInput
                                  type="text"
                                  name="spouse_profession"
                                  value={values.spouse_profession}
                                  placeholder="Spouse's profession"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  {...{ errors, touched }}
                                />
                              </div>
                              <div className='col-md-6 col-sm-12'>
                                <label>Spouse's Annual Income</label>
                                <WrappedInput
                                  type="text"
                                  prepend="₦"
                                  append="Annually"
                                  name="spouse_annual_income"
                                  value={formatCurrencyInput(values.spouse_annual_income)}
                                  placeholder="Spouse's annual income"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  {...{ errors, touched }}
                                />
                              </div>
                            </div>
                          ) : ''
                        }
                        {/* <!-- if married ends --> */}

                        <FieldArray name='children'>
                          {
                            ({ remove, push }) => {
                              return (
                                <>
                                  <div className='row'>
                                    <div className='col-md-12'>
                                      <label>Do you have children/dependents</label>
                                      <div className="row">
                                        {
                                          DEFAULT_RADIO_VALUES.map((item, index) => (
                                            <div key={index} className='col-6'>
                                              <input
                                                type="radio"
                                                value={item}
                                                name="have_children"
                                                className="form-radio"
                                                checked={item === values.have_children}
                                                onBlur={handleBlur}
                                                onChange={({ target }) => {
                                                  handleChange({ target });
                                                  if (target.value === DEFAULT_RADIO_VALUES[0]) push(getNewChild());
                                                  else {
                                                    if (values.children.length) for (let i = values.children.length - 1; i >=  0; i--) remove(i);
                                                  }
                                                }}
                                                {...{ errors, touched }}
                                              />
                                              <label className="text--capitalize">{ toTitleCase(item) }</label>
                                            </div>
                                          ))
                                        }
                                        {getErrorMsg('have_children', errors, touched)}
                                      </div>
                                    </div>
                                  </div>
                                  {

                                    values.have_children === DEFAULT_RADIO_VALUES[0] ? (
                                      <div className='row'>
                                        <div className='col-md-12 children-list'>
                                          <div className='row position-relative'>
                                            <div className='col-md-12 d-flex mt-4'>
                                              <label>Children/Other Dependents</label>
                                              <button
                                                type="button"
                                                onClick={
                                                  () => {
                                                    push(getNewChild());
                                                  }
                                                }
                                                className="btn-primary item-btn float-right"
                                              >
                                                <FontAwesomeIcon size='1x' icon={faPlus} />
                                              </button>
                                            </div>
                                          </div>
                                          {
                                            values.children.map(({ id, name, age, relationship }, index) => (
                                              <div className='row align-items-center mt-4' key={id}>
                                                <div className='col-md-4 col-12 mb-auto'>
                                                  <WrappedInputWithError
                                                    type='text'
                                                    value={name}
                                                    placeholder='Name'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    name={`children[${index}].name`}
                                                    {...{ errors, touched }}
                                                  />
                                                </div>
                                                <div className='col-md-2 col-sm-4 col-4 mt-3 mt-md-0 mb-auto'>
                                                  <WrappedInputWithError
                                                    value={age}
                                                    type='number'
                                                    placeholder='Age'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    name={`children[${index}].age`}
                                                    {...{ errors, touched }}
                                                  />
                                                </div>
                                                <div className='col-md-3 col-sm-6 col-6 mt-3 mt-md-0 mb-auto'>
                                                  <WrappedInputWithError
                                                    type='text'
                                                    onBlur={handleBlur}
                                                    value={relationship}
                                                    onChange={handleChange}
                                                    placeholder='Relationship'
                                                    name={`children[${index}].relationship`}
                                                    {...{ errors, touched }}
                                                  />
                                                </div>
                                                <div className='col-2 mt-3 mt-md-0 mb-auto'>
                                                  <button
                                                    type='button'
                                                    onClick={() => {
                                                      if (values.children.length === 1) {
                                                        handleChange({ target: { name: 'have_children', value: 'no' } })
                                                      }
                                                      remove(index);
                                                    }}
                                                    className='btn btn-danger item-btn'
                                                  >
                                                    <FontAwesomeIcon icon={faMinus} />
                                                  </button>
                                                </div>
                                              </div>
                                            ))
                                          }
                                        </div>
                                      </div>
                                    ) : ''
                                  }
                                </>
                              );
                            }
                          }
                        </FieldArray>

                        <div className="row mt-4">
                          <div className='col-md-6 col-12'>
                            <label>Next-of-Kin’s Name</label>
                            <WrappedInputWithError
                              withMargin
                              type="text"
                              placeholder="Name"
                              name="next_of_kin_name"
                              value={values.next_of_kin_name}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              {...{ errors, touched }}
                            />
                          </div>
                          <div className='col-md-6 col-7'>
                            <label>Next-of-Kin’s Relationship</label>
                            <WrappedInputWithError
                              withMargin
                              type="text"
                              placeholder="Relationship"
                              name="next_of_kin_relationship"
                              value={values.next_of_kin_relationship}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              {...{ errors, touched }}
                            />
                          </div>
                          <div className='col-md-4 col-5'>
                            <label>Next-of-Kin’s Age</label>
                            <WrappedInputWithError
                              withMargin
                              type="number"
                              placeholder="Age"
                              name="next_of_kin_age"
                              value={values.next_of_kin_age}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              {...{ errors, touched }}
                            />
                          </div>
                          <div className='col-md-8 col-12'>
                            <label>Next-of-Kin Address</label>
                            <WrappedInputWithError
                              withMargin
                              type="text"
                              placeholder="Residential Address"
                              name="next_of_kin_address"
                              value={values.next_of_kin_address}
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
          }
        }
      </Formik>
    </Wrapper>
  );
}

const mapStateToProps = ({ application }, ownProps) => {
  const {
    marital_status, annual_rent_value, current_apartment_status, spouse_name,
    spouse_address, spouse_employer, spouse_work_experience, spouse_profession,
    spouse_annual_income, children, next_of_kin_name, next_of_kin_relationship,
    next_of_kin_age, next_of_kin_address, have_children, app_ref
  } = application;
  return {
    marital_status, annual_rent_value, current_apartment_status, spouse_name,
    spouse_address, spouse_employer, spouse_work_experience, spouse_profession,
    spouse_annual_income, children, next_of_kin_name, next_of_kin_relationship,
    next_of_kin_age, next_of_kin_address, have_children, app_ref, ...ownProps
  };
};
 
export default connect(mapStateToProps)(OtherInfoForm);