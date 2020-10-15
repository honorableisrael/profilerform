import * as Yup from 'yup';
import styled from '@emotion/styled'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, FieldArray } from 'formik';
import React from 'react'
import { connect, useDispatch } from 'react-redux';
import { toTitleCase } from '../../utils/dashboardUtils';
import WrappedInput, { WrappedInputWithError, WrappedSelectWithError } from '../WrappedInput';
import { DEFAULT_RADIO_VALUES } from '../../constants';
import { getErrorMsg, validations } from '../../utils/yupUtils';
import { batchDispatcher } from '../../utils/applicationBatchDispatchHelper';
import applicationActions from '../../store/actions/applicationActions';
import affordabilityActions from '../../store/actions/affordabilityActions';
import { formatCurrencyInput } from '../../utils/currencyUtils';
import ButtonSpinner from '../ButtonSpinner';
import postApplication from './postApplication';


const getNewIncomeSource = () => ({ id: new Date().getTime().toString(), source: '', amount: '' });
const getNewObligation = () => ({
  id: new Date().getTime().toString(), loan_type: '', lender_name: '',
  loan_frequency: '', existing_payment: '', outstanding_amount: ''
});

const Wrapper = styled.div`
`;

const validationSchema = Yup.object().shape({
  have_expenses: validations.requiredString,
  monthly_gross_pay: validations.requiredCurrencyField,
  monthly_expenses: validations.currencyFieldWithWhen(['have_expenses', {
    is: value => value === DEFAULT_RADIO_VALUES[0],
    then: validations.requiredCurrencyField
  }]),
  other_source_of_income: Yup.array().of(Yup.object().shape({
    source: validations.requiredString,
    amount: validations.requiredCurrencyField
  })),
  existing_loans: Yup.array().of(Yup.object().shape({
    loan_type: validations.requiredString,
    lender_name: validations.requiredString,
    loan_frequency: validations.requiredString,
    existing_payment: validations.requiredCurrencyField,
    outstanding_amount: validations.requiredCurrencyField,
  }))
});

const FinancialInfoStepFormOne = ({
  firstname, monthly_income, have_additional_income, goToNextComponent, goToPreviousComponent, ...rest
}) => {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    const {
      other_source_of_income, have_other_obligations, have_expenses,
      existing_loans, monthly_expenses, monthly_gross_pay, 
    } = values;
    const applicationData = {
      monthly_gross_pay, other_source_of_income, existing_loans, have_expenses, monthly_expenses
    };
    const affordabilityData = { have_other_obligations };
    const hasExpenses = have_expenses === DEFAULT_RADIO_VALUES[0];
    const hasAdditionalIncome = have_additional_income === DEFAULT_RADIO_VALUES[0];
    const have_existing_obligation = have_other_obligations === DEFAULT_RADIO_VALUES[0];
    applicationData.other_source_of_income = hasAdditionalIncome ? other_source_of_income : [];
    applicationData.existing_loans = have_existing_obligation ? existing_loans : [];
    applicationData.monthly_expenses = hasExpenses ? monthly_expenses : 0;
    batchDispatcher(applicationData, applicationActions, dispatch);
    batchDispatcher(affordabilityData, affordabilityActions, dispatch);
    
    const data = {
      ...applicationData, have_existing_obligation, monthly_income,
      outstanding_loans: applicationData.existing_loans,
    };
    try {
      const res = await postApplication(data);
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
        {({ values, isSubmitting, handleChange, handleBlur, errors, touched }) => {
          return (
            <Form className="form">
              <div className='row'>
                <div className="fp-personal-info-form">
                  <div>
                    <div>
                      <span>Ordinary Mortgage | Financial Info</span>
                      <h2>
                        Looking good {toTitleCase(firstname)}! Let’s talk about your
                        finances, our partner lenders will need the info below.
                      </h2>
                      <div className='row'>
                        <div className='col-12 col-sm-6'>
                          <label>Total Annual Pay</label>
                          <WrappedInput
                            prepend="₦"
                            type="text"
                            append="Yearly"
                            value={(() => {
                              return formatCurrencyInput((monthly_income || 0) * 12);
                            })()}
                            disabled
                          />
                        </div>
                        <div className='col-sm-6 col-12'>
                          <label>Monthly Gross Pay</label>
                          <WrappedInputWithError
                            prepend="₦"
                            type="text"
                            append="Monthly"
                            name="monthly_gross_pay"
                            value={formatCurrencyInput(values.monthly_gross_pay)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            {...{ errors, touched }}
                          />
                        </div>
                        <div className='col-sm-6 col-12'>
                          <label>Monthly Net Pay</label>
                          <WrappedInput
                            type="text"
                            prepend="₦"
                            append="Monthly"
                            value={formatCurrencyInput(monthly_income)}
                            disabled
                          />
                        </div>
                      </div>

                      {
                        have_additional_income === DEFAULT_RADIO_VALUES[0] ? (
                          <FieldArray name='other_source_of_income'>
                            {
                              ({ push, remove }) => {
                                if (!values.other_source_of_income.length) push(getNewIncomeSource());
                                return (
                                  <div className='row'>
                                    <div className='col-md-12'>
                                      <span className="float-right text-black">
                                        {/* <!-- Sum the amount of all extra sources if there's any --> */}
                                        {/* Total: ₦ { otherIncomeSourcesTotal } */}
                                      </span>
                                      <div className='row'>
                                        <div className='col-md-12 d-flex mt-4 mb-n4'>
                                          <label>Other Source(s) of Income</label>
                                          <v-spacer />
                                          <button
                                            type="button"
                                            className="btn-primary float-right"
                                            onClick={() => {
                                              push(getNewIncomeSource())
                                            }}
                                          >
                                            <FontAwesomeIcon size='1x' icon={faPlus} />
                                          </button>
                                        </div>
                                        {values.other_source_of_income.map(({ id, source, amount }, index) => {
                                          return (
                                            <div className={`row px-3 mt-${index ? 4 : 0}`} key={id}>
                                              <div className='col-sm-5 col-12 mb-auto'>
                                                <WrappedInputWithError
                                                  value={source}
                                                  placeholder='Source'
                                                  name={`other_source_of_income[${index}].source`}
                                                  onBlur={handleBlur}
                                                  onChange={handleChange}
                                                  {...{ errors, touched }}
                                                />
                                              </div>
                                              <div className='col-sm-5 mt-3 mt-sm-0 col-9 mb-auto'>
                                                <WrappedInputWithError
                                                  value={formatCurrencyInput(amount)}
                                                  placeholder='Amount'
                                                  name={`other_source_of_income[${index}].amount`}
                                                  onBlur={handleBlur}
                                                  onChange={handleChange}
                                                  {...{ errors, touched }}
                                                />
                                              </div>
                                              <div className='col-sm-1 col-1 mt-3 mt-sm-0 mb-auto'>
                                                <button
                                                  className='item-btn btn-danger'
                                                  onClick={() => {
                                                    remove(index);
                                                  }}
                                                >
                                                  <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            }
                          </FieldArray>
                        ) : ''
                      }

                      <FieldArray name='existing_loans'>
                        {({ push, remove }) => {
                          return (
                            <div className='row mt-4'>
                              <div className='col-md-12'>
                                <label>Outstanding loans (if any)</label>
                                <div className="row">
                                  {
                                    DEFAULT_RADIO_VALUES.map((status, index) => (
                                      <div
                                        key={index}
                                        className='col-6'
                                      >
                                        <input
                                          type="radio"
                                          value={status}
                                          className="form-radio"
                                          name="have_other_obligations"
                                          values={values.have_other_obligations}
                                          onBlur={handleBlur}
                                          onChange={({ target }) => {
                                            handleChange({ target });
                                            if (target.value === DEFAULT_RADIO_VALUES[0]) push(getNewObligation());
                                            else {
                                              if (values.existing_loans) for (let i = values.existing_loans.length - 1; i >=  0; i--) remove(i);
                                            }
                                          }}
                                        />
                                        <label className="text--capitalize">{ toTitleCase(status) }</label>
                                      </div>
                                    ))
                                  }
                                </div>
                                {getErrorMsg('have_other_obligations', errors, touched)}
                              </div>
                              {
                                values.have_other_obligations === DEFAULT_RADIO_VALUES[0] ? (
                                  <div className='col-md-12'>
                                    <div className='row mb-n4'>
                                      <div className='col-md-12 d-flex'>
                                        <label>Outstanding Loan Details</label>
                                        <button
                                          type="button"
                                          className="btn-primary float-right"
                                          onClick={() => push(getNewObligation())}
                                        >
                                          <FontAwesomeIcon size='1x' icon={faPlus} />
                                        </button>
                                      </div>
                                    </div>
                                    {
                                      values.existing_loans.map((obligation, index) => {
                                        const {
                                          id, loan_type, lender_name, loan_frequency, existing_payment, outstanding_amount
                                        } = obligation;
                                        return (
                                          <div className={`row mt-${index ? 4 : 0}`} key={id}>
                                            <div className='col-md-2 col-sm-6 col-12 mb-auto'>
                                              <WrappedInputWithError
                                                value={lender_name}
                                                placeholder='Lender name'
                                                name={`existing_loans[${index}].lender_name`}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                {...{ errors, touched }}
                                              />
                                            </div>
                                            <div className='col-md-2 col-sm-6 col-12 mt-2 mt-md-0 mb-auto'>
                                              <WrappedSelectWithError
                                                value={loan_type}
                                                placeholder='Loan type'
                                                name={`existing_loans[${index}].loan_type`}
                                                options={[
                                                  'Personal loan', 'Mortgage', 'Payday loan', 'Car loan', 'Others'
                                                ]}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                {...{ errors, touched }}
                                              />
                                            </div>
                                            <div className='col-md-2 col-sm-6 col-12 mt-2 mt-md-0 mb-auto'>
                                              <WrappedInputWithError
                                                value={formatCurrencyInput(outstanding_amount)}
                                                placeholder='Outstanding amount'
                                                name={`existing_loans[${index}].outstanding_amount`}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                {...{ errors, touched }}
                                              />
                                            </div>
                                            <div className='col-md-2 col-sm-6 col-12 mt-2 mt-md-0 mb-auto'>
                                              <WrappedSelectWithError
                                                value={loan_frequency}
                                                placeholder='Loan frequency'
                                                name={`existing_loans[${index}].loan_frequency`}
                                                options={[
                                                  'Monthly', 'Quarterly', 'Yearly'
                                                ]}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                {...{ errors, touched }}
                                              />
                                            </div>
                                            <div className='col-md-2 col-sm-8 col-10 mt-2 mt-md-0 mb-auto'>
                                              <WrappedInputWithError
                                                value={formatCurrencyInput(existing_payment)}
                                                placeholder='Paid amount'
                                                name={`existing_loans[${index}].existing_payment`}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                {...{ errors, touched }}
                                              />
                                            </div>
                                            <div className='col-md-1 col-sm-2 col-2 mt-2 mt-md-0 mb-auto'>
                                            <button
                                              className='item-btn btn-danger'
                                              onClick={() => {
                                                remove(index);
                                              }}
                                            >
                                              <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                            </div>
                                          </div>
                                        );
                                      })
                                    }
                                  </div>
                                ) : ''
                              }
                            </div>
                          );
                        }}
                      </FieldArray>
                      
                      <div className='row mt-4'>
                        <div className='col-md-12'>
                          <label>Any monthly expenses?</label>
                          <div className='row'>
                            {
                              DEFAULT_RADIO_VALUES.map((status, index) => (
                                <div
                                  key={index}
                                  className='col-6'
                                >
                                  <input
                                    type="radio"
                                    value={status}
                                    name="have_expenses"
                                    className="form-radio"
                                    checked={values.have_expenses === status}
                                    onBlur={handleBlur}
                                    onChange={({ target }) => {
                                      handleChange({ target });
                                      handleChange({ target: { name: 'monthly_expenses', value: '' } });
                                    }}
                                  />
                                  <label className="text--capitalize">{ status }</label>
                                </div>
                              ))
                            }
                          </div>
                          {getErrorMsg('have_expenses', errors, touched)}
                        </div>

                        {
                          values.have_expenses === DEFAULT_RADIO_VALUES[0] ? (
                            <div className='col-md-6'>
                              <label>Estimated Monthly Living Expenses</label>
                              <WrappedInput
                                prepend="₦"
                                type="text"
                                append="Monthly"
                                placeholder="Monthly expenses"
                                name="monthly_expenses"
                                value={formatCurrencyInput(values.monthly_expenses)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                {...{ errors, touched }}
                              />
                            </div>
                          ) : ''
                        }
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
                    className='w-100 item-btn mb-3'
                  >
                    {
                      isSubmitting ? <ButtonSpinner /> : 'submit'
                    }
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
}

const mapStateToProps = ({ application, affordability, earnings }, ownProps) => {
  const {
    monthly_income, monthly_gross_pay, have_additional_income, other_source_of_income,
    have_other_obligations, existing_loans, have_expenses, monthly_expenses, firstname
  } = { ...application, ...earnings, ...affordability };
  return {
    monthly_income, monthly_gross_pay, have_additional_income,
    other_source_of_income, have_other_obligations, existing_loans,
    have_expenses, monthly_expenses, firstname, ...ownProps
  };
};
 
export default connect(mapStateToProps)(FinancialInfoStepFormOne);