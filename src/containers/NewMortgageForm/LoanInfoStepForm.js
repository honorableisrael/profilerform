import styled from '@emotion/styled'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import React from 'react'
import { connect, useDispatch } from 'react-redux';
import WrappedInput, { WrappedInputWithError } from '../WrappedInput';
import { getErrorMsg, validations } from '../../utils/yupUtils';
import { batchDispatcher } from '../../utils/applicationBatchDispatchHelper';
import applicationActions from '../../store/actions/applicationActions';
import { formatCurrencyInput } from '../../utils/currencyUtils';
import ButtonSpinner from '../ButtonSpinner';
import postApplication from './postApplication';


const Wrapper = styled.div`
  .property-description + .error-message {
    margin-left: 1rem;
  }

  .checkbox-wrapper {
    display: flex;
    margin-top: 32px;
  }

  .agreement-checkbox {
    width: 3rem;
    /* height: 6rem; */
    margin-right: 1rem;
    display: inline-block;
  }

  .checkbox-wrapper label {
    width: auto;
  }

  label.invalid {
    color: red;
  }

  label.touched.valid {
    color: green;
  }
`;

const validationSchema = Yup.object().shape({
  property_title: validations.requiredString,
  property_address: validations.requiredString,
  agreed_to_terms: Yup.boolean().equals([true]),
  property_description: validations.requiredString
});

const LoanInfoStepForm = ({
  firstname, equity_contribution, loan_amount, property_value, goToNextComponent, goToPreviousComponent, ...rest
}) => {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    const {
      property_title, property_address, property_description, agreed_to_terms
    } = values;
    const data = { property_title, property_address, property_description, agreed_to_terms };
    batchDispatcher(data, applicationActions, dispatch);
    try {
      const res = await postApplication({...data, equity_contribution, loan_amount, property_value});
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
          (({ values, handleBlur, handleChange, errors, touched, isSubmitting }) => {
            return (
              <Form className="form loan-info-form">
                <div className='container'>
                  <div className="fp-personal-info-form">
                    <div>
                      <div>
                        <span>Ordinary Mortgage | Loan Info &amp; Declaration</span>
                        <h2>
                          Looking good {firstname}! Let’s talk about your finances,
                          our partner lenders will need the info below.
                        </h2>
                        <div className='row'>
                          <div className='col-sm-6 col-12'>
                            <label>Proposed Equity Contribution</label>
                            <WrappedInput
                              prepend="₦"
                              type="text"
                              value={formatCurrencyInput(equity_contribution)}
                              disabled
                            />
                          </div>

                          <div className='col-sm-6 col-12'>
                            <label>Loan Amount</label>
                            <WrappedInput
                              prepend="₦"
                              type="text"
                              value={formatCurrencyInput(loan_amount)}
                              disabled
                            />
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-sm-6 col-12'>
                            <label>Property Title</label>
                            <WrappedInputWithError
                              type="text"
                              placeholder="Title"
                              name="property_title"
                              value={values.property_title}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              {...{ errors, touched }}
                            />
                          </div>
                          <div className='col-sm-6 col-12'>
                            <label>Property Value</label>
                            <WrappedInput
                              prepend="₦"
                              type="text"
                              value={formatCurrencyInput(property_value)}
                              disabled
                            />
                          </div>
                          <div className='col-12'>
                            <label>Property Address</label>
                            <input
                              type="text"
                              placeholder="Address"
                              name="property_address"
                              value={values.property_address}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              {...{ errors, touched }}
                            />
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-12 property-description'>
                            <label>Property Description</label>
                            <textarea
                              rows="6"
                              className='form-control'
                              placeholder="Please describe the property"
                              name="property_description"
                              value={values.property_description}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              {...{ errors, touched }}
                            />
                          </div>
                          {getErrorMsg('property_description', errors, touched)}
                        </div>

                        <div className='row'>
                          <div className='col-md-12 checkbox-wrapper'>
                            <input
                              type='checkbox'
                              name="agreed_to_terms"
                              className="agreement-checkbox"
                              value={(
                                values.agreed_to_terms === 'yes' || (values.agreed_to_terms && values.agreed_to_terms !== 'no')
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <label
                              className={
                                `${Boolean(
                                  touched.agreed_to_terms && errors.agreed_to_terms
                                ) ? 'invalid ' : 'valid '}${touched.agreed_to_terms ? 'touched' : ''}`.trim()
                              }
                            >
                              I {firstname}, hereby declare that all information
                              provided in this application are correct and that all
                              documents submitted with this form are authentic. I
                              agree that Afreal Limited could cross-check the
                              information provided above and may request for
                              references from my employer and/or financial
                              institutions mentioned above. I therefore agree that any
                              material misstatement discovered renders my application
                              null and void.
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row mt-5'>
                    <div className='col-md-6 px-0 pr-md-3'>
                      <button
                        disabled={isSubmitting}
                        onClick={goToPreviousComponent}
                        className='w-100 item-btn mb-md-0 mb-3'
                      >
                        back
                      </button>
                    </div>
                    <div className="col-md-6 px-0 pl-md-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className='w-100 item-btn'
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
          })
        }
      </Formik>
    </Wrapper>
  );
};

const mapStateToProps = ({ application, affordability, currentUser }, ownProps) => {
  const {
    equity_contribution, loan_amount, property_title, property_address,
    property_value, property_description, firstname, agreed_to_terms
  } = { ...application, ...affordability, ...currentUser };
  return {
    equity_contribution, loan_amount, property_title, property_address,
    property_value, property_description, firstname, agreed_to_terms, ...ownProps
  };
};
 
export default connect(mapStateToProps)(LoanInfoStepForm);