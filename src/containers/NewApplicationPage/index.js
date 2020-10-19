import styled from '@emotion/styled';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faExclamationTriangle, faExpand } from '@fortawesome/free-solid-svg-icons';

import NewHeader from '../NewHeader';
import SummarySection from './SummarySection';
import withNewStyles from '../../hocs/withNewStyles';
import NewEligibilityForm from '../NewEligibilityForm';
import NewAffordabilityForm from '../NewAffordabilityForm';
import PropertySuggestionSection from './PropertySuggestionSection';
import affordabilityTypes from '../../store/types/affordabilityTypes';
import affordabilityActions from '../../store/actions/affordabilityActions';
import cookies from '../../utils/cookies';
import http from '../../config/axios.config';
import { batchDispatcher } from '../../utils/applicationBatchDispatchHelper';
import propertyActions from '../../store/actions/propertyActions';
import requestActions from '../../store/actions/requestActions';
import ProfileFormWrapper from '../ProfileForm';
import fetchProperties from '../../utils/fetchProperties';
import { clearCommas } from '../../utils/currencyUtils';


const Wrapper = styled.div`
  .form-control {
    min-height: 40px !important;
  }

  .input-group-prepend .input-group-text {
    background: transparent;
  }

  input::placeholder {
    opacity: 0.5;
  }

  .error-message {
    color: red !important;
    font-size: 14px !important;
  }

  [type='submit'] {
    color: white;
    background: teal;
    border-color: #009688;
    background-color: #009688;
  }

  button {
    border: none;
    height: 36px;
    padding: 0 16px;
    min-width: 64px;
    font-weight: 500;
    border-radius: .25rem;
    text-transform: uppercase;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  }

  button:not(.item-btn) {
    margin-bottom: 64px;
  }

  input:disabled:hover,
  input.range-slider__range:disabled:hover,
  input.range-slider__range:disabled::-webkit-slider-thumb:hover {
    cursor: not-allowed;
  }

  .application-flow {
    /* margin-bottom: 250px !important; */
  }

  .application-flow form button::not(.item-btn) {
    margin-bottom: 64px !important;
  }

  .application-flow .summary-sticker,
  .application-flow .suggestions-sticker {
    display: none !important;
  }

  .mortgage-flow-page,
  .eligibility-page-content,
  .mortgage-page-content {
    height: 100% !important;
  }

  .affordability-page-content > div,
  .eligibility-page-content > div,
  .mortgage-page-content > div {
    height: 100%;
    overflow-y: auto;
  }

  label {
    /* font-weight: 800; */
    color: rgb(64, 64, 64, 0.8);
    font-size: 1rem;
    font-weight: 400;
    margin-top: 0.7rem;
  }

  label sup {
    color: red;
  }

  .form-radio {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: inline-block;
    position: relative;
    background-color: #f1f1f1;
    color: #00b1ab;
    top: 10px;
    height: 30px;
    width: 30px;
    border: 0;
    border-radius: 50px;
    cursor: pointer;
    margin-right: 7px;
    outline: none;
  }

  .form-radio:checked::before {
    position: absolute;
    font: 13px;
    left: 11px;
    top: 4px;
    content: "\\02143";
    transform: rotate(40deg);
  }

  .form-radio:hover {
    background-color: #f7f7f7;
  }

  .form-radio:checked {
    background-color: #f1f1f1;
  }

  .range-slider {
    margin: 10px 0 0 0%;
  }

  .range-slider {
    width: 100%;
  }

  .range-slider__range {
    -webkit-appearance: none;
    /* height: 8px; */
    /* border-radius: 5px; */
    background: #d7dcdf;
    outline: none;
    padding: 0;
    margin: 0;
    height: 6px;
    width: 100%;
    background: #d1deec;
    border-radius: 6px;
  }

  .range-slider__range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    width: 40px;
    height: 25px;
    border: 0;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
    -moz-transition: background 0.15s ease-in-out;
    transition: background 0.15s ease-in-out;
    border: 4px solid #00b1ab;
    box-shadow: rgba(97, 115, 136, 0.2) 0px 1px 4px,
      rgba(57, 71, 87, 0.16) 0px 2px 20px, rgb(255, 106, 255) 0px 0px 0px,
      rgb(62, 232, 255) 0px 0px 0px, rgb(255, 245, 0) 0px 0px 0px;
  }

  .range-slider__range::-webkit-slider-thumb:hover {
    background: #1abc9c;
  }

  .range-slider__range:active::-webkit-slider-thumb {
    background: #1abc9c;
  }

  .range-slider__range::-moz-range-thumb {
    /* width: 20px;
    height: 20px; */
    width: 35px;
    height: 15px;
    border: 0;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
    -moz-transition: background 0.15s ease-in-out;
    transition: background 0.15s ease-in-out;
    border: 4px solid #00b1ab;
    box-shadow: rgba(97, 115, 136, 0.2) 0px 1px 4px,
      rgba(57, 71, 87, 0.16) 0px 2px 20px, rgb(255, 106, 255) 0px 0px 0px,
      rgb(62, 232, 255) 0px 0px 0px, rgb(255, 245, 0) 0px 0px 0px;
  }

  .range-slider__range::-moz-range-thumb:hover {
    background: #1abc9c;
  }

  .range-slider__range:active::-moz-range-thumb {
    background: #1abc9c;
  }

  .range-slider__range:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 3px #fff, 0 0 0 6px #1abc9c;
  }

  .range-slider__value {
    display: inline-block;
    position: relative;
    width: 60px;
    color: #fff;
    line-height: 20px;
    text-align: center;
    border-radius: 3px;
    background: #2c3e50;
    padding: 5px 10px;
    margin-left: 8px;
  }

  .range-slider__value:after {
    position: absolute;
    top: 8px;
    left: -7px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-right: 7px solid #2c3e50;
    border-bottom: 7px solid transparent;
    content: "";
  }

  .v-input__prepend-outer,
  .v-input__append-inner {
    position: relative;
    bottom: -5px;
    color: #666;
  }

  .v-text-field--outlined > .v-input__control > .v-input__slo {
    min-height: 40px !important;
  }

  .v-text-field__prefix {
    margin-right: 10px;
  }

  input::placeholder {
    opacity: 0.5;
  }

  @media screen and (max-width: 768px) {
    .application-flow {
      margin-bottom: unset !important;
    }

    .application-flow .application-highlight-section {
      display: none;
    }

    .application-flow .summary-sticker,
    .application-flow .suggestions-sticker {
      left: 0px;
      height: 60px;
      position: fixed;
      align-items: center;
      justify-content: center;
      display: flex !important;
      box-shadow: 0px 0px 5px #333333;
    }

    .application-flow .summary-sticker {
      left: -52px;
      top: 250px;
      /* width: 32px; */
      height: fit-content;
      z-index: 1000;
      padding-top: 4px;
      padding-left: 8px;
      padding-right: 8px;
      padding-bottom: 4px;
      /* background: #bbbbbb33; */
      background: var(--accent-color);
      border-radius: 4px;
      transform: rotate(90deg);
    }

    .application-flow .summary-sticker > * {
      color: white;
      padding: 0px;
      margin: 0px;
    }

    .application-flow .suggestions-sticker {
      bottom: 0px;
      width: 100%;
      /* z-index: 3; */
      padding: 8px 16px;
      color: var(--white-color);
      background: var(--accent-color);
    }

    .property-suggestion-toggle,
    .property-suggestion-toggle + input {
      z-index: 100;
      display: none;
    }
  }

  /* @media screen and (min-width: 768px) { */
    [class*='form-section'] {
      flex-grow: 2;
    }
  /* } */

  .mortgage-flow-nav {
    /* width: 50vw; */
  }

  input.expand-suggestions:checked ~ .property-suggestions-section {
    width: 100vw;
    position: absolute;
    background: white;
  }
`;

// const NoEmailAlertWrapper = styled.div`
//   & {
//     min-height: 100vh;
//   }

//   .alert-box {
//     width: 90%;
//     padding: 32px;
//     margin: 0 auto;
//     margin-top: 64px;
//     max-width: 480px;
//     border-radius: 12px;
//     box-shadow: 0px 0px 16px #CCCCCCCC;
//   }

//   h1 {
//     display: flex;
//     align-items: center;
//     margin-bottom: 24px;
//     justify-content: center;
//   }

//   .fas {
//     width: 36px;
//     margin-right: 16px;
//     color: var(--warning);
//   }

//   label.mortgage-flow-nav {
//     width: 50vw !important;
//   }
// `;

// const NoEmailAlert = withNewStyles(({}) => {
//   const history = useHistory();
//   const [time, setTime] = useState(5);
//   const interval = setInterval(() => {
//     setTime(time - 1);
//     if (time === 1) {
//       history.replace('/');
//       clearInterval(interval);
//     }
//   }, 1000);
  
//   return (
//     <NoEmailAlertWrapper>
//       <NewHeader />
//       <div className='alert-box'>
//         <h1>
//           <FontAwesomeIcon className='fas' icon={faExclamationTriangle}/>
//           Email required
//         </h1>
//         <p>
//           It is required to have entered your email before this stage.
//         </p>
//         <p>Redirecting to homepage in {time} seconds</p>
//       </div>
//     </NoEmailAlertWrapper>
//   )
// });

const NewApplicationPage = ({ properties, budget, dispatch }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [success, setSuccess] = useState(false);
  const [foundProperty, setFoundProperty] = useState(false);
  const [summaryStickerOpen, setSummaryStickerOpen] = useState(false);
  const [suggestionsStickerOpen, setSuggestionsStickerOpen] = useState(false);
  const thereAreProperties = properties && properties.length;
  const [submitted, setSubmitted] = useState(false);
  const [submittedAffordability, setSubmittedAffordability] = useState(false);
  const [formDataJSON, setFormDataJSON] = useState(
    JSON.stringify({ states: [], propertyTypes: [] })
  );


  const { states, propertyTypes } = JSON.parse(formDataJSON);
  const statesMapped = {};
  const propertyTypesMapped = {};
  states.forEach(({ id, name }) => statesMapped[name.toLowerCase()] = id);
  propertyTypes.forEach(({ id, name }) => propertyTypesMapped[name.toLowerCase()] = id);

  const setPropertyStoreData = async ({
    id, property_city, property_bedrooms,
    property_price, property_type, property_state
  }) => {
    const fctVariants = ['abuja', 'fct'];
    const cityName = property_city?.toLowerCase();
    const stateName = property_state?.toLowerCase();
    const propertyType = property_type?.toLowerCase();
    const propertyTypeId = propertyTypesMapped[propertyType];
    const propertyStateId = fctVariants.includes(stateName)
      ?
      (statesMapped[fctVariants[0]] || statesMapped[fctVariants[1]])
      : statesMapped[stateName];
    try {
      const { data: { data: cities } } = await http.get(`/general/all-cities/${propertyStateId}`);
      const city = (cities || []).find(({ name }) => name.toLowerCase() === cityName);
      const cityId = city?.id;
      const values = {
        property_id: id, state_id: propertyStateId,
        property_value: +clearCommas(property_price), city_id: cityId,
        property_bedroom: property_bedrooms, property_type_id: propertyTypeId
      };
      batchDispatcher(values, requestActions, dispatch);
      await http.post(
        '/police/property-request',
        {
          budget,
          ...values,
          request_type: 'home',
          directed_to: 'police Deve',
          payment_option: 'mortgage',
          found_property: foundProperty
        }
      );
      setFoundProperty(true);
      setSuccess(true);
      setTimeout(goToEligibility, 200);
    } catch (error) {
      alert('An error occured. Please try again');
      console.log(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const [{ data: { data: states } }, { data: { data: propertyTypes } }] = await Promise.all([
          http.get('/general/all-states'), http.get('/general/all-properties-types/1')
        ]);

        setFormDataJSON(JSON.stringify({ states, propertyTypes }));
        fetchProperties(dispatch);
      } catch (error) { console.log(error.message); }
    })();
  }, []);


  // if user has not entered email redirect
  // if (!userEmail) return <NoEmailAlert />;
  
  const goToEligibility = () => {
    if (activeTab !== 2) setActiveTab(2);
  }
  const handleTabChange = ({ target: { value } }) => setActiveTab(+value);

  return (
    <Wrapper>
      <NewHeader />
      <main>
        <div className="application-flow">
          {/* <!--Affordability Tab--> */}
          <div
            className='summary-sticker'
            onClick={() => setSummaryStickerOpen(!summaryStickerOpen)}
          >
            {/* <!-- <v-icon v-if="summaryStickerOpen">fas fa-angle-down</v-icon> */}
            {/* <v-icon v-else>fas fa-angle-up</v-icon> --> */}
            <p>{ summaryStickerOpen ? 'Hide' : 'Show'} summary</p>
          </div>
          <input
            name="mortgage-flow-nav"
            type="radio"
            value="0"
            checked={activeTab === 0}
            onChange={handleTabChange}
            className="mortgage-flow-toggle"
            id="affordabilty-test"
          />
          <div className="mortgage-flow-page">
            {/* <!-- <label for="mobile-toggle" className="mobile-toggle-trigger">Form Submit Sample</label>
            <input type="checkbox" className="mobile-toggle" name="mobile-toggle" id="mobile-toggle" /> --> */}
            <div className="affordability-page-content">
              {
                thereAreProperties ? (
                  <>
                    <label className="property-suggestion-toggle" htmlFor="expand-suggestions">
                      <FontAwesomeIcon className='fas' icon={faExpand} /> Expand
                    </label>
                    <input
                      type="checkbox"
                      name="expand-suggestions"
                      id="expand-suggestions"
                      className="expand-suggestions"
                    />
                  </>
                ) : ''
              }

              <SummarySection
                closed={!summaryStickerOpen}
                sectionHeading="Affordability test"
              />

              <div className="profile-form-section">
                <div className="form-content-wrapper">
                  <h2 className="section-heading">Tell us about yourself</h2>
                  <ProfileFormWrapper
                    {...{ setActiveTab, setFoundProperty }}
                  />
                </div>
              </div>
              <PropertySuggestionSection
                closed={!suggestionsStickerOpen}
                {...{goToEligibility, setPropertyStoreData, submittedAffordability, activeTab}}
              />
            </div>
          </div>
          <label className="mortgage-flow-nav" htmlFor="affordabilty-test">Profile</label>
          {/* <!--Eligibity Tab--> */}
          <input
            name="mortgage-flow-nav"
            type="radio"
            value="1"
            disabled={activeTab < 1}
            checked={activeTab === 1}
            onChange={handleTabChange}
            className="mortgage-flow-toggle"
            id="eligibility-test"
          />
          <div className="mortgage-flow-page">
            <div className="eligibility-page-content">
              {
                thereAreProperties ? (
                  <>
                    <label className="property-suggestion-toggle" htmlFor="expand-suggestions2">
                      <FontAwesomeIcon className='fas' icon={faExpand} /> Expand
                    </label>
                    <input
                      type="checkbox"
                      name="expand-suggestions"
                      id="expand-suggestions2"
                      className="expand-suggestions"
                    />
                  </>
                ) : ''
              }
              <SummarySection
                closed={!summaryStickerOpen}
                sectionHeading="Affordability test"
              />

              <div className="affordability-form-section">
                <div className="form-content-wrapper">
                  <h2 className="section-heading">How much can I afford to borrow?</h2>
                  {
                    activeTab === 1 ? (
                      <NewAffordabilityForm
                        {...{ setActiveTab, setFoundProperty, setSubmittedAffordability }}
                      />
                    ) : ''
                  }
                </div>
              </div>
              {/* <!-- <div className="application-highlight-section"></div> --> */}
              <PropertySuggestionSection
                closed={!suggestionsStickerOpen}
                {...{goToEligibility, setPropertyStoreData, submittedAffordability, activeTab}}
              />
            </div>
          </div>
          <label className="mortgage-flow-nav" htmlFor="eligibility-test">Affordability Test</label>
          {/* <!--Application Tab--> */}
          <input
            name="mortgage-flow-nav"
            type="radio"
            value="2"
            disabled={activeTab < 2}
            checked={activeTab === 2}
            onChange={handleTabChange}
            className="mortgage-flow-toggle"
            id="mortgage-application"
          />
          <div className="mortgage-flow-page">
            <div className="mortgage-page-content">
              {
                thereAreProperties ? (
                  <>
                    <label className="property-suggestion-toggle" htmlFor="expand-suggestions3">
                      <FontAwesomeIcon className='fas' icon={faExpand} /> Expand
                    </label>
                    <input
                      type="checkbox"
                      name="expand-suggestions"
                      id="expand-suggestions3"
                      className="expand-suggestions"
                    />
                  </>
                ) : ''
              }
              <SummarySection
                closed={!summaryStickerOpen}
                sectionHeading="Eligibility test"
              />
              <div className="eligibility-form-section">
                <h2 className="section-heading">Request a property</h2>
                {
                  activeTab === 2 ? (
                    <NewEligibilityForm
                      {...{
                        setActiveTab, propertyTypes, foundProperty,
                        setSubmitted, success, setSuccess, states
                      }}
                    />
                  ) : ''
                }
              </div>
              {/* <!-- <div className="application-highlight-section"></div> --> */}
            </div>
          </div>
          <label className="mortgage-flow-nav" htmlFor="mortgage-application">Property Request</label>
          {
            thereAreProperties ? (
              <div
                className="suggestions-sticker d-flex"
                onClick={() => setSuggestionsStickerOpen(!suggestionsStickerOpen)}
              >
                <p className="mb-0">
                  <span>{suggestionsStickerOpen ? 'Hide ' : 'See '}</span>
                  <span>property suggestions</span>
                </p>
                <div className="icon-group ml-5">
                  <FontAwesomeIcon
                    color='white'
                    className='fas'
                    icon={suggestionsStickerOpen ? faAngleDown : faAngleUp}
                  />
                </div>
              </div>
            ) : ''
          }
        </div>
      </main>
    </Wrapper>
  );
};
 
const mapStateToProps = ({ properties, affordability: { max_loanable_amount }, currentUser: { email } }, ownProps) => ({
  properties: properties.data, budget: max_loanable_amount, email, ...ownProps
});

export default withNewStyles(connect(mapStateToProps)(NewApplicationPage));