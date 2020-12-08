import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { Form, Formik } from 'formik';
import { useDispatch, connect } from 'react-redux';

import { currencyFieldTransformer, validations } from '../../utils/yupUtils';
import WrappedInput, { WrappedInputWithError, WrappedSelectWithError } from '../WrappedInput';
import affordabilityTypes from '../../store/types/affordabilityTypes';
import { invalidValueErrorMessage, requiredFieldErrorMessage } from '../../utils/validationMessageUtils';
import { clearCommas, formatCurrencyInput, handleChangeRetriever, roundToUpperTwoDecimalPlace } from '../../utils/currencyUtils';
import http from '../../config/axios.config';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CircularLoader from '../CircularLoader';
import ButtonSpinner from '../ButtonSpinner';


const Wrapper = styled.div`
  p.info {
    color: #999 !important;
  }

  .success-component {
    width: 100%;
    height: 100%;
    display: flex;
    min-height: 60vh;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .success-component .icon-wrapper {
    padding: 16px;
    border-radius: 50%;
    margin-bottom: 24px;
    border: 6px solid var(--accent-color);
  }

  .success-component h3 {
    color: #999 !important;
  }
`;
// const CircularLoader = styled(CircularLoader)

const NewEligibilityForm = ({
  setActiveTab, states, propertyTypes, success, setSuccess,
  foundProperty, affordability, request, setSubmitted
}) => {
  // const dispatch = useDispatch();
  const [stateId, setStateId] = useState('');
  // const [success, setSuccess] = useState(false);
  const [citiesJSON, setCitiesJSON] = useState('[]');
  const [loadingCities, setLoadingCities] = useState(false);
  const { max_loanable_amount, equity_contribution } = affordability;
  const affords = +clearCommas(max_loanable_amount) + +clearCommas(equity_contribution);
  // const getHandleChange = handleChangeRetriever(dispatch);

  const cities = JSON.parse(citiesJSON);

  useEffect(() => {
    (async () => {
      try {
        setLoadingCities(true);
        // console.log(stateId)
        const { data: { data } } = await axios.get(`https://staging.newhomes.ng/api/general/all-cities/${stateId || request.state_id}`);
        setCitiesJSON(JSON.stringify(data));
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoadingCities(false);
      }

    })()
  }, [stateId]);

  const handleSubmit = async (values) => {
    try {
      await http.post(
        '/save-property-request',
        // 'https://staging.newhomes.ng/api/police/property-request',
        {
          directed_to: 'police Deve',
          request_type: 'home',
          payment_option: 'mortgage',
          ...values,
          budget: affordability.budget,
          payment_option: affordability.payment_option,
          found_property: foundProperty
        }
      );
      setSubmitted(true);
      setSuccess(true);
    } catch (error) {
      console.log(error.message);
    }
  };


  const validationSchema = (() => {
    return Yup.object().shape({
      // budget: validations.requiredCurrencyField,
      property_type_id: validations.requiredString,
      state_id: validations.requiredString,
      city_id: validations.requiredString,
      property_value: validations.requiredCurrencyField,
      property_bedroom: validations.requiredInteger.min(1, 'Minimum of one'),
      property_bathroom: validations.requiredInteger.min(1, 'Minimum of one'),
    });
  })();

  return (
    <Wrapper>
      <div className='container'>
        {
          success ? (
            <div className='success-component'>
              <div className="icon-wrapper">
                <FontAwesomeIcon
                  color='var(--accent-color)'
                  size='5x'
                  icon={faCheck}
                />
              </div>
              <h3>Application submitted successfully</h3>
            </div>
          ) : (
            <Formik
              initialValues={{
                city_id: request.city_id,
                state_id: request.state_id,
                //budget: request.budget || affords,
                property_value: request.property_value,
                property_type_id: request.property_type_id,
                property_bedroom: request.property_bedroom,
                property_bathroom: request.property_bathroom,
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => {
                return (
                  <Form>
                    <div className='row'>
                      <div className="col-12 col-sm-6 form-group">
                        
                        <WrappedSelectWithError
                          textKey='name'
                          name='property_type_id'
                          value={values.property_type_id}
                          extractValue={({ id }) => id}
                          options={[{ name: 'Select a home type', id: '' }, ...propertyTypes]}
                          {...{ errors, touched }}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control form-control-lg form-area"
                        />
                        <label className="form-label">Home type<sup>*</sup></label>
                      </div>
                      <div className="col-12 col-sm-6 form-group">
                        
                        <WrappedInputWithError
                          // prepend="₦"
                          name='property_value'
                          value={formatCurrencyInput(values.property_value)}
                          {...{ errors, touched }}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control form-control-lg form-area"
                        />
                        <label className="form-label">Home value <sup>*</sup></label>
                      </div>
                    </div>
                    
                        <div className="row">
                          <div className="col-md-6 col-sm-6 form-group">
                            
                            <WrappedInputWithError
                              type='number'
                              // append="bedrooms"
                              name='property_bedroom'
                              value={values.property_bedroom}
                              {...{ errors, touched }}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              className="form-control form-control-lg form-area"
                            />
                            <label className="form-label">Number of Bedrooms <sup>*</sup></label>
                          </div>
                          <div className="col-md-6 col-sm-6 form-group">
                            
                            <WrappedInputWithError
                              type='number'
                              // append="bedrooms"
                              name='property_bathroom'
                              value={values.property_bathroom}
                              {...{ errors, touched }}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              className="form-control form-control-lg form-area"
                            />
                            <label className="form-label">Number of Bathrooms <sup>*</sup></label>
                          </div>
                          
                        </div>
                      <div className="row">
                      <div className="col-12 col-sm-6 form-group">
                        
                        <WrappedSelectWithError
                          textKey='name'
                          name='state_id'
                          value={values.state_id}
                          extractValue={({ id }) => id}
                          options={[{ name: 'Select a state', id: '' }, ...states]}
                          {...{ errors, touched }}
                          onBlur={handleBlur}
                          onChange={({ target }) => {
                            setStateId(target.value);
                            handleChange({ target });
                            
                          }}
                          className="form-control form-control-lg form-area"
                        />
                        <label className="form-label">Desired state <sup>*</sup></label>
                      </div>
                      <div className="col-12 col-sm-6 form-group">
                        
                        <WrappedSelectWithError
                          textKey='name'
                          name='city_id'
                          value={values.city_id}
                          extractValue={({ id }) => id}
                          options={[{ name: 'Select a city', id: '' }, ...cities]}
                          {...{ errors, touched }}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control form-control-lg form-area"
                        />
                        <label className="form-label">Desired city <sup>*</sup>
                          <CircularLoader
                            size='24px'
                            isLoading={loadingCities}
                            otherStyles={{
                              top: '0px',
                              right: '-60px'
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    {/* <div className='form-group row'>
                      <div className="col-md-12">
                        <label>Budget *</label>
                        <WrappedInputWithError
                          prepend="₦"
                          name='budget'
                          placeholder="50,000,000"
                          value={formatCurrencyInput(values.budget)}
                          {...{ errors, touched }}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <p className='info text-green'>
                          You can afford up to ₦{formatCurrencyInput(max_loanable_amount)}. Any amount above this will be asumed to include your equity contribution
                        </p>
                      </div>
                    </div> */}

                    <div className='form-group row mt-5'>
                      <div className="col-md-6">
                        <button
                          type='button'
                          disabled={isSubmitting}
                          className='w-100 item-btn mb-md-0 mb-3'
                          onClick={() => {
                            setSuccess(false);
                            setActiveTab(1)
                          }}
                        >
                          back
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button
                          type='submit'
                          className='w-100'
                          disabled={isSubmitting}
                        >
                          {
                            isSubmitting ? (
                              <ButtonSpinner />
                            ) : 'submit'
                          }
                        </button>
                      </div>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          )
        }
      </div>
    </Wrapper>
  );
};

const mapStateToProps = ({ affordability, request }, ownProps) => ({ affordability, request, ...ownProps });
 
export default connect(mapStateToProps)(NewEligibilityForm);
