import styled from '@emotion/styled';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faExclamationTriangle, faExpand } from '@fortawesome/free-solid-svg-icons';
import BathIcon from "../Resource/bathroom.png";
import BedIcon from "../Resource/bedroom.png";
import ButtonSpinner from '../ButtonSpinner';

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
import { clearCommas, formatCurrencyInput } from '../../utils/currencyUtils';
import ProfileMenu from "../../commons/ProfileMenu";




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
    font-size: 14px !important;
  }

  .error-message {
    color: red !important;
  }
  .top-headers{
    margin-left: 30px;
    margin-top: 8px;
    margin-bottom: 10px;
  }

  [type='submit'] {
    color: white;
    background: teal;
    border-color: #009688;
    background-color: #009688;
  }
  .profile-form-section{
    background:var(--primary-background-color) !important; 
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
    padding: 0;
    grid-template-rows: 0px 1fr;
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
  .section-heading{
    font-weight: 700;
    font-size: 24px;
    line-height: 29.21px;
    margin-top: 30px;
    margin-left: 30px;
    color: black;
  }
  .section-text{
    font-weight: 325;
    font-size: 12px;
    line-height: 14.4px;
    margin-top: 10px;
    margin-bottom: 40px;
    margin-left: 30px;
    padding-bottom: 15px;
    color: black !important;
    border-bottom: 0.5px solid #BBBBBB;
  }

  .affordability-page-content > div,
  .eligibility-page-content > div,
  .mortgage-page-content > div {
    height: 100%;
    overflow-y: auto;
  }
  .affordability-page-content > *{
    padding: 0px;
  }
  .affordability-form-section, .eligibility-form-section{
    background:var(--primary-background-color) !important;
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
    background-color: var(--secondary-background-color);
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

  .modal-dialog{
    max-width: 860px !important;
  }

  .property__image{
    width: 100%;
    // position: relative;
    height: 250px;
    background: url("/../Resource/propty.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .property__content{
    padding-left: 50px;
    padding-right: 50px;
    position: relative;
  }

  .property__head{
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid #bbbbbb;
    margin-bottom: 20px;
    
  }
  .property__title{
    font-weight: 700;
    font-size: 16px;
    padding-bottom: 15px
  }
  .property__name, .property__address{
    color: #666666;
  }
  .property__head > h2{
    font-weight: 700;
    font-size: 28px;
    line-height: 41.5px;
    color: var(--accent-color);
    padding-left: 50px;
    border-left: 1px solid #bbbbbb;
    padding-bottom: 15px
  }
  .property__features{
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid #bbbbbb;
    padding-bottom: 20px;
    text-align: center;
  }
  .property__icon > img{
    height: 24px;
    width: 24px;
  }
  .property__finance, .property__status {
    display: flex;
    font-weight: 700;
    font-size: 14px;
    color: #666666;
  }
  .property__finance > h4, .property__status > h4{
    font-size: 14px;
    padding-right: 5px;
  }
  .property__finance > p{
    color: var(--red-color);
  }
  .property__status > p{
    color: var(--green-color)
  }
  .property__description > h3{
    font-weight: 700;
    font-size: 16px;
  }
  .property__description > p{
    font-weight: 325;
    font-size: 14px;
  }

  .property__link{
    padding-bottom: 10px;
    font-size: 14px;
    font-weight: 700;
    width: 100%;
    position: relative;
    margin-bottom: 20px;
  }

  .property__link > a{
    position: absolute;
    right: 0;
    color: var(--accent-color);
  }

  .property__button{
    margin-bottom: 30px !important;
  }
  .selection{
    margin-left: 60px;
    margin-right: 60px;
  }
  .selection__content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }
  .selection__icon{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #E9F2E9;
    margin-bottom: 15px;
  }
  .selection__icon > img{
    margin-bottom: 0;
  }
  .selection__header{
    font-size: 24px;
    font-weight: 325;
    line-height: 28.8px;
  }
  .selection__header > span{
    font-weight: 700;
  }
  .selection__text{
    font-size: 14px;
    font-weight: 325;
    line-height: 16.8px;
    color: #666666;
    margin-bottom: 15px;
  }
  @media screen and (max-width: 770px){
    .affordability-page-content, .eligibility-page-content, .mortgage-page-content{
      display: flex;
      flex-direction: column !important;
    }
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

const NewApplicationPage = ({ properties, dispatch }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [success, setSuccess] = useState(false);
  const [alertUser, setAlertUser] = useState(false);
  const [foundProperty, setFoundProperty] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [summaryStickerOpen, setSummaryStickerOpen] = useState(false);
  const [suggestionsStickerOpen, setSuggestionsStickerOpen] = useState(false);
  const thereAreProperties = properties && properties.length;
  const [submitted, setSubmitted] = useState(false);
  const [submittedAffordability, setSubmittedAffordability] = useState(false);
  const [formDataJSON, setFormDataJSON] = useState(
    JSON.stringify({ states: [], propertyTypes: [], paymentOptions: [] })
  );



  const { states, propertyTypes, paymentOptions } = JSON.parse(formDataJSON);
  const statesMapped = {};
  const propertyTypesMapped = {};
  states.forEach(({ id, name }) => statesMapped[name.toLowerCase()] = id);
  propertyTypes.forEach(({ id, name }) => propertyTypesMapped[name.toLowerCase()] = id);

  alert = () => setAlertUser(true);

  useEffect(() => {
    if (selectedProperty) setAlertUser(false);
  }, [selectedProperty]);

  const setPropertyStoreData = async ({
    id, property_city, property_bedrooms,
    property_price, property_type, property_state
  }) => {
    setAlertUser(false);
    const fctVariants = ['abuja', 'fct'];
    const cityName = property_city?.toLowerCase();
    const stateName = property_state?.toLowerCase();
    const propertyType = property_type?.toLowerCase();
    const propertyTypeId = propertyTypesMapped[propertyType];
    const propertyStateId = fctVariants.includes(stateName)
      ?
      (statesMapped[fctVariants[0]] || statesMapped[fctVariants[1]])
      : statesMapped[stateName];
    // try {
      const { data: { data: cities } } = await http.get(`/general/all-cities/${propertyStateId}`);
      const city = (cities || []).find(({ name }) => name.toLowerCase() === cityName);
      const cityId = city?.id;
      const bedrooms = typeof property_bedrooms === 'string' && property_bedrooms.includes('-') ?
        +property_bedrooms.split('-')[1].trim()
        : (+property_bedrooms || '');
      const values = {
        property_id: id, state_id: propertyStateId,
        property_value: +clearCommas(property_price), city_id: cityId,
        property_bedroom: bedrooms, property_type_id: propertyTypeId
      };
      batchDispatcher(values, requestActions, dispatch);
      // await http.post(
      //   '/police/property-request',
      //   {
      //     budget,
      //     ...values,
      //     request_type: 'home',
      //     directed_to: 'police Deve',
      //     payment_option: 'mortgage',
      //     found_property: true
      //   }
      // );
      setFoundProperty(true);
      // setSuccess(true);
      goToEligibility();
      // setTimeout(goToEligibility, 200);
    // } catch (error) {
    //   alert('An error occured. Please try again');
    //   console.log(error.message);
    // }
  };

  useEffect(() => {
    (async () => {
      try {
        const [
          { data: { data: states } }, { data: { data: propertyTypes } }, { data: { data: paymentOptions } }
        ] = await Promise.all([
          http.get('/general/all-states'), http.get('/general/all-properties-types/1'), http.get('/general/finance-option')
        ]);

        setFormDataJSON(JSON.stringify({ states, propertyTypes, paymentOptions }));
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

              
              <ProfileMenu 
                profileGreen="green" profileMark='passed' 
                profileCurrent="current" 
              />

              <div className="profile-form-section">
                <div className="form-content-wrapper">
                  <h2 className="section-heading">Profile</h2>
                  <SummarySection
                    closed={!summaryStickerOpen}
                    sectionHeading="Affordability test"
                  />
                  <ProfileFormWrapper
                    {...{ setActiveTab, setFoundProperty }}
                  />
                </div>
              </div>
              <PropertySuggestionSection
                closed={!suggestionsStickerOpen}  
                {...{
                  goToEligibility, setPropertyStoreData, submittedAffordability,
                  activeTab, alertUser, selectedProperty, setSelectedProperty
                }}
              />
            </div>
          </div>
          {/* <label className="mortgage-flow-nav" htmlFor="affordabilty-test">Profile</label> */}
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
              
              <ProfileMenu 
                profileGreen="green" profileMark='passed' 
                affordabilityGreenBar="greenBar" affordabilityGreen="green" affordabilityMark='marked' 
                affordabilityCurrent="current" 
              
              />
              <div className="affordability-form-section">
                <div className="form-content-wrapper">
                  <h2 className="section-heading">Affordability Test</h2>
                    <SummarySection
                    closed={!summaryStickerOpen}
                    sectionHeading="Affordability test"
                    />
                  <p className="section-text">Check how much you can afford to borrow</p>
                  {
                    activeTab === 1 ? (
                      <NewAffordabilityForm
                        {...{
                          setActiveTab, setFoundProperty, setSubmittedAffordability, alert, paymentOptions,
                          submittedAffordability, selectedProperty, setSelectedProperty, setPropertyStoreData
                        }}
                      />
                    ) : ''
                  }
                </div>
              </div>
              {/* <!-- <div className="application-highlight-section"></div> --> */}
              <PropertySuggestionSection
                closed={!suggestionsStickerOpen}
                {...{
                  goToEligibility, setPropertyStoreData, submittedAffordability,
                  activeTab, alertUser, selectedProperty, setSelectedProperty
                }}
              />
            </div>
          </div>
          {/* <label className="mortgage-flow-nav" htmlFor="eligibility-test">Affordability Test</label> */}
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
              <ProfileMenu 
                  profileGreen="green" profileMark='passed' 
                  affordabilityGreenBar="greenBar" affordabilityGreen="green" affordabilityMark='passed' 
                  propertyGreenBar="greenBar" propertyGreen="green" propertyMark='marked'
                  propertyCurrent="current" 
              />
              <div className="eligibility-form-section">
                <h2 className="section-heading">Property Request</h2>
                {/* <SummarySection
                closed={!summaryStickerOpen}
                sectionHeading="Eligibility test"
              /> */}
                <p className="section-text">Please provide  your preference for the type of property you would prefer</p>
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
          {/* <label className="mortgage-flow-nav" htmlFor="mortgage-application">Property Request</label> */}
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


        {/* Property suggestion modal */}
        <div id="myModal" className="modal fade" role="dialog" aria-labelledby="..." aria-hidden="true">
                {/* <!-- Modal content--> */}
              <div className="modal-dialog" role="document" style={{width: "auto"}}>
                <div className="modal-content" z-index="20000">
                  <div className="modal-body">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <div className="property__image"><img src="./../Resource/homebase.png"/></div>
                    <div className="property__content">
                      <div className="property__head">
                        <div className="property__title">
                          <div className='property__name'>{selectedProperty ? selectedProperty.property_name : "4 Bd Detached House for Rent at Osapa London"}</div>
                          <div className='property__address'>{selectedProperty ? selectedProperty.property_city : 'Lekki'}, {selectedProperty ? selectedProperty.property_state : "Lagos"}</div>
                        </div>
                        <h2>
                          {selectedProperty ? `${selectedProperty.currency_symbol} ${formatCurrencyInput(selectedProperty.property_price)}` : "#40,000,000.00" }
                        </h2>
                      </div>
                      <div className='property__features'>
                          <div className='property__icon'>
                            <img className='mr-2' src={BedIcon} alt='Bed Icon' />
                            {selectedProperty 
                              ? `${selectedProperty.property_bedrooms} bed`
                              : "N/A"}{" "}
                          </div>
                          <div className='property__icon'>
                              <img className='ml-2' src={BathIcon} alt='Bath Icon' />
                              &nbsp;
                              {selectedProperty 
                                ? `${selectedProperty.property_bathrooms} bath`
                                : "N/A"}{" "}
                          </div>
                          <div className='property__finance'>
                              <h4>Finance Status: </h4>
                              <p>Not Available</p>
                          </div>
                          <div className='property__status'>
                            <h4>Property Status: </h4>
                            <p>Off plan</p>
                          </div>
                      </div>
                      <div className="property__description">
                          <h3>Description</h3>
                          <p>
                          The Address Homes-Femi Okunnu, 4 bed room semi-detached house.This comprises of 20(NOS) beautiful contemporary
                          4 bedrooms luxury semi-detached and 4 fully detached homes with 1 bedroom QB on 3 floors where intelligent design that meets aesthetics to create the perfect backdrop for the modern lifestyle.Features 1 room BQ4 car parkingCommunal - gym, poolEvent hallGreen area24hr powerSwimming PoolCCTV security NetworkArmed Security PersonnelAmple
                          parking spacePrice:4 Bedroom Semi-detached: 125,000,000
                          </p>
                      </div>
                      <div className="property__link"><a href="https://newhomes.ng">View on newhomes.ng</a></div>
                      <div className="col-md-12 col-sm-12">
                          <button
                            type='submit'
                            className='w-100 property__button'
                            // disabled={isSubmitting}
                          >
                             Choose this Property
                          </button>
                       </div>
                    </div>
                   
                  </div>
                </div>
              </div>
        </div>

        {/* Modal for Property Selection */}
        <div id="myModal2" className="modal fade" role="dialog" aria-labelledby="..." aria-hidden="true">

                {/* <!-- Modal content--> */}
              <div className="modal-dialog" role="document">
                <div className="modal-content" z-index="20000">
                  <div className="modal-body">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <div className="selection">
                    <div className="selection__content">
                        <div className="selection__icon"><img src="./../Resource/Ellipse 1.png" /></div>
                        <h2 className="selection__header">Good job <span>Solamipe</span></h2>
                        <p className="selection__text">we are excited you made it this far of the process, however just a few step to your dream home...
                            You need to choose a property from the options we provided or request a property if you didnt find your preferred
                        </p>
                    </div>
                    <div className='row'>
                          <div className='col-md-6 col-sm-12'>
                                <button
                                    type='button'
                                    className='w-150 mb-3'
                                    rel='noopener noreferrer'
                                    data-toggle="modal" data-target="#myModal3"
                                    // onClick={() => setModalStatus(true)}
                                    data-dismiss="modal"
                                >
                                    Choose a Property
                                </button>
                          </div>
                          <div className='col-md-6 col-sm-12'>
                                <button
                                    type='button'
                                    // disabled={isSubmitting}
                                    onClick={() => {
                                      setSelectedProperty(null);
                                      setActiveTab(2);
                                      {/* setsubmittedAtLeastOnce(false); */}
                                      {/* resetForm(); */}
                                    }}
                                    data-dismiss="modal"
                                    className=' w-100 fp-save-result-button m-0 d-flex align-items-center justify-content-center btn-block mb-3'
                                >
                                  Request a Property
                                </button>
                            </div>
                        </div>
                      </div>
                    
                  </div>
                </div>
              </div>
        </div>
      </main>
    </Wrapper>
  );
};
 
const mapStateToProps = ({ properties, currentUser: { email } }, ownProps) => ({
  properties: properties.data, email, ...ownProps
});

export default withNewStyles(connect(mapStateToProps)(NewApplicationPage));