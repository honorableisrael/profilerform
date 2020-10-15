import styled from '@emotion/styled';
import React, { useState } from 'react';
import withNewStyles from '../../hocs/withNewStyles';
// import NewApplicationPage from '../NewApplicationPage';
import NewHeader from '../NewHeader';
// import NewFooter from '../NewFooter';
import ProfileForm from '../ProfileForm';


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

  & {
    padding-bottom: 120px;
  }
`;

const ProfilePage = () => {
  return (
    <Wrapper>
      <NewHeader />
      <ProfileForm />
      {/* <NewFooter /> */}
    </Wrapper>
  )
};
 
export default withNewStyles(ProfilePage);