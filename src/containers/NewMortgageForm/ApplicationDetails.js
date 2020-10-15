import React, { useEffect, useState } from 'react'
import printJS from 'print-js';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { printJSStyles } from '../../constants';
import cookies from '../../utils/cookies';
import ButtonSpinner from '../ButtonSpinner';

const Wrapper = styled.div`
  .print-btn {
    color: #3B937A;
  }

  #fp-mortgage-application {
      background-color: #ffffff;
      border-radius: 12px;
      /*height: 100vh;*/
      /*height: calc(var(--vh, 1vh) * 100);*/
  }
  .fp-mortgage-application {
      padding: 0px;
  }

  #fp-mortgage-application .fp-mortgage-landing-page-with-nhanla {
      /* margin-top: 80px; */
      /*padding: 120px 0px;*/
      /* max-width: 800px;  */
  }

  .fp-mortgage-landing-page-with-nhanla .fp-mortgage-application-nhanla {
      width: 100px;
      height: 100px;
      background-position: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      display: block;
      margin: 20px auto;
  }

  .fp-mortgage-landing-page-with-nhanla h2 {
      color: #2e2e2e;
      text-align: left;
      font-size: 20px;
      font-weight: 800;
      margin: 20px auto;
      line-height: 1.5;
  }

  .fp-mortgage-landing-page-with-nhanla p {
      font-size: 16px;
      color: #2e2e2e;
      margin-bottom: 11px;
      margin-top: 5px;
      font-weight: 400;
  }

  .fp-mortgage-landing-page-with-nhanla .fp-mortgage-application-criteria {
      margin: 10px 0 0;
  }

  .fp-mortgage-landing-page-with-nhanla .fp-mortgage-application-criteria li {
      padding: 6px 0;
      color: #00b1ab;
      font-size: 28px;
      line-height: 23px;
      margin: 10px 0 0;
      font-weight: 400;
  }

  .fp-mortgage-landing-page-with-nhanla .fp-mortgage-application-criteria li span {
      color: #2e2e2e;
      font-size: 16px;
      vertical-align: bottom;
  }

  .fp-mortgage-landing-page-with-nhanla .fp-mortgage-application-criteria li a {
      text-decoration: none;
  }

  .fp-mortgage-landing-page-with-nhanla .fp-lets-begin-nhanla-button-wrapper {
      display: flex;
      justify-content: center;
  }

  /* .fp-pattern-overlay-footer {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(../Resource/header-bg-pattern-copy.png);
    background-size: cover;
    background-position: 50%;
    top: 0%;
  } */

  /* Personal Info Form */

  .fp-mortgage-application .fp-personal-info-form {
      /* margin-top: 20px; */
      /* padding-top: 35px; */
      /* max-width: 700px; */
      padding: 10px 25px;
  }

  .fp-personal-info-form span {
      font-size: 15px;
      color: #2e2e2e;
      line-height: 2px;
      font-weight: 400;
  }

  .fp-personal-info-form h2 {
      color: #2e2e2e;
      text-align: left;
      font-size: 20px;
      font-weight: 800;
      margin: 20px auto;
  }

  .fp-personal-info-form input,
  .fp-personal-info-form select {
      background-color: #fff;
      border: 1px solid #ada7a7;
      height: 42px;
      line-height: 17px;
      padding: 0 16px;
      border-radius: 3px;
      box-sizing: border-box;
      color: #969292;
      font-size: 14px;
  }

  .fp-personal-info-form input:focus,
  .fp-personal-info-form select:focus {
      outline: 0;
      box-shadow: none;
  }

  .form-control.is-invalid:focus,
  .was-validated .form-control:invalid:focus {
      border-color: #dc3545;
      box-shadow: none;
  }

  .fp-personal-info-form input::placeholder {
      font-size: 14px;
      font-weight: 400;
      text-transform: uppercase;
      opacity: 0.6;
  }

  .fp-personal-info-form label {
      font-size: 15px;
      color: #2e2e2e;
      margin-bottom: 11px;
      margin-top: 5px;
      font-weight: 200;
  }

  .input-group-append {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
  }

  .fp-home-type-checkbox {
      /* position: absolute;
      top: 50%;
      left: 50%;
      margin-right: -50%; */
      /* transform: translate(-50%, -50%) scale(2, 2); */
      display: flex;
  }

  .fp-home-type-checkbox input {
      display: none;
  }

  .fp-home-type-checkbox label {
      font-size: 15px;
      color: #2e2e2e;
      display: inline-block;
      padding: 0 0 0 20px;
      margin-top: 2px;
  }
  .fp-home-type-checkbox label:before {
      content: "";
      display: inline-block;
      background: #00b1ab;
      position: absolute;
      left: 0;
      top: 5px;
      height: 20px;
      width: 20px;
      margin-right: 10px;
      border-radius: 80%;
      box-shadow: 0px 1px 5px rgb(0, 177, 171, 0.502);

      box-sizing: border-box;
      border: 10px solid #fff;
      transition: border 0.3s ease;
  }

  .fp-home-type-checkbox input:checked + label:before {
      border-color: #fff;
      border-width: 3px;
  }
  .fp-home-type-checkbox input + label {
      transition: color 0.7s ease;
  }
  .fp-home-type-checkbox input:checked + label {
      color: #00b1ab;
  }

  .fp-personal-info-form .fp-child-name {
      border-bottom-right-radius: 0%;
      border-top-right-radius: 0%;
  }

  .fp-personal-info-form .fp-child-age {
      border-radius: 0%;
  }

  .fp-personal-info-form .fp-child-relationship {
      border-bottom-left-radius: 0%;
      border-top-left-radius: 0%;
  }

  .fp-mortgage-application-preview {
      padding: 60px 0;
  }

  .fp-mortgage-landing-preview-card::before {
      content: attr(data-label);
      display: block;
      position: absolute;
      top: -9px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      background-color: inherit;
      color: #2e2e2e;
      /*color: #00b1ab;*/
      padding: 0 5px;
  }

  .fp-mortgage-landing-preview-card {
      font-size: 20px;
      padding: 20px;
      margin: 20px;
      background-color: #fff;
      /* border: 1px solid #2e2e2e29; */
      /*border: 1px solid rgb(0, 177, 171, 1.191);*/
      border:1px solid #a9a5a5;
      position: relative;
      border-radius: 5px;
  }

  .fp-mortgage-application-preview .fp-mortgage-landing-preview-card span {
      color: #2e2e2e;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
  }

  .fp-mortgage-application-preview .fp-mortgage-landing-preview-card span:hover {
      cursor: pointer;
  }

  .fp-mortgage-application-preview span.fp-mortgage-application-action-btn {
      background-color: #00b1ab;
      border-color: #00b1ab;
      color: #fff;
      font-weight: 400;
      font-size: 12px;
      padding: 8px 12px;
      border-radius: 5px;
      margin-bottom: 20px;
  }

  .fp-mortgage-application-preview p {
      font-size: 15px;
      text-align: left;
      font-weight: 300;
      color: #7a7a7a;
  }

  .rtable {
      /* display: inline-block; */
      vertical-align: top;
      max-width: 100%;
      overflow-x: auto;
      white-space: nowrap;
      border-collapse: collapse;
      border-spacing: 0;
      margin-top: 20px;
  }

  .rtable {
      -webkit-overflow-scrolling: touch;
      background: -webkit-radial-gradient(
              left ellipse,
              rgba(0, 0, 0, 0.2) 0%,
              rgba(0, 0, 0, 0) 75%
      )
      0 center,
      -webkit-radial-gradient(
              right ellipse,
              rgba(0, 0, 0, 0.2) 0%,
              rgba(0, 0, 0, 0) 75%
      ) 100% center;
      background: radial-gradient(
              ellipse at left,
              rgba(0, 0, 0, 0.2) 0%,
              rgba(0, 0, 0, 0) 75%
      )
      0 center,
      radial-gradient(
              ellipse at right,
              rgba(0, 0, 0, 0.2) 0%,
              rgba(0, 0, 0, 0) 75%
      )
      100% center;
      background-size: 10px 100%, 10px 100%;
      background-attachment: scroll, scroll;
      background-repeat: no-repeat;
  }

  .rtable td:first-of-type {
      background-image: -webkit-linear-gradient(
              left,
              white 50%,
              rgba(255, 255, 255, 0) 100%
      );
      background-image: linear-gradient(
              to right,
              white 50%,
              rgba(255, 255, 255, 0) 100%
      );
      background-repeat: no-repeat;
      background-size: 20px 100%;
  }

  .rtable td:last-child {
      background-image: -webkit-linear-gradient(
              right,
              white 50%,
              rgba(255, 255, 255, 0) 100%
      );
      background-image: linear-gradient(
              to left,
              white 50%,
              rgba(255, 255, 255, 0) 100%
      );
      background-repeat: no-repeat;
      background-position: 100% 0;
      background-size: 20px 100%;
  }

  .rtable th {
      font-size: 11px;
      text-align: left;
      text-transform: uppercase;
      background: #f3f4f5;
  }

  .rtable th,
  .rtable td {
      padding: 6px 12px;
      border: 1px solid #d9d7ce;
      font-size: 13px;
  }

  .fp-mortgage-application-continue-button {
      background-color: #0143ba;
      border: 1px solid #0143ba;
      padding: 10px 80px !important;
      line-height: 1.5;
      border-radius: 5px;
      color: #fff !important;
      font-weight: 600;
      text-decoration: none !important;
      float: right;
      font-size: 13px;
      margin-top: 20px;
  }

  .employer-group, .other-employments-wrapper {
      position: relative;
  }

  .employer-group .datalist-wrapper, .other-employments-wrapper .datalist-wrapper {
      position: absolute;
      width: 100%;
      max-height: 120px;
      overflow: auto;
      top: 80px;
      background: #fff;
      z-index: 2;
      border: 1px solid #ccc;
  }

  .employer-group input ~ div.datalist-wrapper div#companies > div,
  .other-employments-wrapper input ~ div.datalist-wrapper > div {
      width: 100%;
      height: 40px;
      padding: 10px 20px;
  }

  .employer-group input ~ div.datalist-wrapper div#companies > div:hover,
  .other-employments-wrapper input ~ div.datalist-wrapper div#companies > div:hover {
      background: #ccc;
  }

  .fp-mortgage-application-preview-printer {
      float: right;
      color: #2e2e2e;
  }

  .fp-mortgage-application-preview-printer:hover {
      cursor: pointer;
  }
  /*my style*/
  .lender_logo2{
      background-size: cover;
      width:120px;
      max-width: 250px;
      height: 120px;
      background-position:center;
      background-repeat: no-repeat;
      border-radius: 5px;
  }
  @media print {
      .no-print {
          display: none;
      }

      .fp-mortgage-landing-preview-card[data-label='Financial Information'] {
          margin-top: 250px;
      }
  }

  .loader {
    margin: auto;
    top: 25%;
  }
  a,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  li,
  span {
    text-rendering: geometricPrecision;
  }
  .span-parent span {
    font-size: 12px;
    color: #bbbbbb;
    font-weight: 800;
  }
  .span-parent h4 {
    font-size: 14px;
    color: #555555;
    font-weight: 600;
    margin: 5px auto;
    max-width: 360px;
    line-height: 1.5;
    margin-bottom: 20px;
  }
  .fp-mortgage-application-lender-info {
    padding: 10px 20px;
    background: #ffffff;
    border-radius: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .fp-mortgage-application-client-doc {
    background: #fff;
    padding: 10px 15px;
    border-radius: 20px;
  }
  .fp-mortgage-lender-company-info {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  .fp-mortgage-lender-company-info-wrap {
    display: flex;
    justify-content: flex-start;
    padding-top: 15px;
  }

  .fp-mortgage-application-loan-value {
    padding: 40px 20px;
    background: #022f8f;
    border-radius: 10px;
  }
  .fp-mortgage-application-loan-value h2 {
    font-size: 30px;
    color: #ffffff;
    /* margin: auto 10px; */
    font-weight: 800;
  }
  .fp-mortgage-application-loan-value p {
    font-size: 15px;
    color: #ffffff;
    margin: auto 2px;
    /*text-align: left;*/
  }
  /*col-md-8*/
  .fp-mortgage-application-loan-info-display {
    padding: 30px 30px;
    background: #ffffff;
    border-radius: 10px;
  }
  .fp-mortgage-application-loan-info-display
    .fp-mortgage-application-reference-no-loan-status {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-bottom: 10px;
    border-bottom: 2px dotted #f0f4f7;
  }

  .fp-mortgage-application-reference-no-loan-status
    .fp-mortgage-application-date {
    margin: 0 180px 0px 0px;
    /* bottom: 0; */
  }
  .fp-mortgage-loan-amount-repayment-interest-rate {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 15px 0;
    border-bottom: 2px dotted #f0f4f7;
  }
  .fp-mortgage-loan-amount-repayment-interest-rate
    .fp-mortgage-loan-amount-wrap
    h2 {
    font-size: 30px;
    font-weight: 600;
    color: #54af19;
    margin-bottom: -4px;
  }

  .fp-mortgage-loan-amount-repayment-interest-rate .fp-mortgage-repayment h2,
  .fp-mortgage-loan-amount-repayment-interest-rate
    .fp-mortgage-loan-interest-rate
    h2 {
    font-size: 30px;
    color: #555555;
    font-weight: 600;
    margin-bottom: -4px;
  }
  .fp-mortgage-loan-more-information {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    border-bottom: 2px dotted #f0f4f7;
  }
  .fp-mortgage-loan-more-information .fp-mortgage-loan-type-application-wrap {
    display: flex;
    /* justify-content: right; */
    flex-direction: row;
    margin-bottom: 10px;
  }
  .fp-mortgage-loan-type-application-wrap .fp-mortgage-loan-application-type {
    padding: 6px 20px;
    background: #bbbbbb;
    border-radius: 0.25rem;
    margin-left: 80px;
    height: 30px;
    opacity: 0.5;
  }
  .fp-mortgage-loan-type-application-wrap .fp-mortgage-loan-type span {
    font-size: 12px;
    color: #bbbbbb;
    font-weight: 800;
  }

  .details-box {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }

  .details-box table {
    width: 100%;
  }
  .c1-13 {
    grid-column: 1 / 13;
  }

  .c1-4 {
    grid-column: 1 / 4;
  }

  .c4-7 {
    grid-column: 4 / 7;
  }

  .c4-10 {
    grid-column: 4 / 10;
  }

  .c7-10 {
    grid-column: 7 / 10;
  }

  .c10-13 {
    grid-column: 10 / 13;
  }

  .c1-7 {
    grid-column: 1 / 7;
  }

  .c1-5 {
    grid-column: 1 / 5;
  }

  .c5-9 {
    grid-column: 5 / 9;
  }

  .c5-13 {
    grid-column: 5 / 13;
  }

  .c9-13 {
    grid-column: 9 / 13;
  }

  .c7-13 {
    grid-column: 7 / 13;
  }
`;


const ApplicationDetails = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    lender_name, firstname, lastname, middlename, goToPreviousComponent,
    address, email, phone, age, sex, place_of_birth, nationality, lender,
    state_of_origin, highest_education, profession, current_apartment_status,
    annual_rent_value, marital_status, spouse_name, spouse_address, spouse_work_experience,
    spouse_employer, spouse_profession, spouse_annual_income, children, next_of_kin_address,
    next_of_kin_name, next_of_kin_age, next_of_kin_relationship, employer_name, employer_phone,
    employer_email, employer_address, monthly_gross_pay, monthly_net_pay, equity_contribution,
    loan_tenure, loan_amount, have_employer_guarantor, outstanding_loans, monthly_expenses, other_source_of_income
  } = props;

  const country = JSON.parse(nationality || '{}');
  const total_annual_pay = (monthly_net_pay || 0) * 12;
  const down_payment = equity_contribution;
  const app_ref = props.app_ref || cookies.get('app_ref');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      
    } catch (error) {
      
    } finally {
      setIsSubmitting(false);
    }
  };

  // const blessTawk = () => {
  //   setTimeout(() => {
  //     const tawk = document.getElementById('tawkchat-minified-box');
  //     console.log(tawk);
  //     if (tawk) tawk.classList.add('no-print');
  //   }, 500);
  // };

  // useEffect(() => {
  //   window.addEventListener('DOMContentLoaded', blessTawk);
  //   return () => {
  //     window.removeEventListener('DOMContentLoaded', blessTawk);
  //   };
  // }, []);

  const print = () => {
    printJS({
      html: 'html',
      printable: 'to-print',
      // style: printJSStyles
    })
  }


  return (
    <Wrapper>
      <div className="d-flex justify-content-end mt-10 px-10">
        <button color="#3B937A" className='print-btn btn btn-light' onClick={print}>Print</button>
      </div>
      <section className="container">
        <div className="container" id="to-print">
          <div className="row fp-mortgage-application">
            <div className="col-md-12">
              <div className="fp-mortgage-landing-page-with-nhanla">
                <div className="row">
                  <div className="col-md-12 fp-personal-info-form">
                    {
                      lender ? (
                        <>
                          <div className="lender_logo2"></div>
                          <h2>{ lender_name }</h2>
                        </>
                      ) : ''
                    }
                    {
                      app_ref ? (
                        <span>
                          <b>REF:</b>
                          { app_ref } | Mortgage Application
                        </span>
                      ) : ''
                    }
                    <br />

                    <div className="fp-mortgage-application-preview">
                      <div data-label="Personal Information" className="fp-mortgage-landing-preview-card">
                        <div className="details-box">
                          <div className="c1-13"></div>
                          <div className="c1-4">
                            <span>Title</span>
                            <p>Mr/Mrs/Miss</p>
                          </div>
                          <div className="c4-7">
                            <span>First Name</span>
                            <p>{ firstname }</p>
                          </div>
                          <div className="c7-10">
                            <span>Last Name</span>
                            <p>{ lastname }</p>
                          </div>
                          <div className="c10-13">
                            <span>Middle Name</span>
                            <p>{ middlename }</p>
                          </div>

                          <div className="c1-4">
                            <span>Address</span>
                            <p>{ address }</p>
                          </div>

                          <div className="c4-10">
                            <span>Email Address</span>
                            <p>{ email }</p>
                          </div>

                          <div className="c10-13">
                            <span>Phone Number</span>
                            <p>{ phone }</p>
                          </div>
                          <div className="c1-4">
                            <span>Age</span>
                            <p>{ age }</p>
                          </div>

                          <div className="c4-7">
                            <span>Sex</span>
                            <p>{ sex }</p>
                          </div>

                          <div className="c7-10">
                            <span>Place of Birth</span>
                            <p>{ place_of_birth }</p>
                          </div>

                          <div className="c10-13">
                            <span>Nationality</span>
                            <p>{ country.name }</p>
                          </div>

                          <div className="c1-4">
                            <span>State of Origin</span>
                            <p>{ state_of_origin }</p>
                          </div>

                          <div className="c4-10">
                            <span>Highest Educational Qualification</span>
                            <p>{ highest_education }</p>
                          </div>

                          <div className="c10-13">
                            <span>Profession</span>
                            <p>{ profession }</p>
                          </div>
                        </div>
                      </div>

                      <div
                        data-label="Other Personal Information"
                        className="fp-mortgage-landing-preview-card mt40"
                      >
                        <div className="details-box">
                          <div className="c1-13"></div>

                          <div className="c1-4">
                            <span>Current Apartment Status</span>
                            <p>{ current_apartment_status }</p>
                          </div>

                          <div className="c4-7">
                            <span>Others</span>
                            <p>-</p>
                          </div>

                          <div className="c7-10">
                            <span>Annual Rent</span>
                            <p>{ annual_rent_value }</p>
                          </div>

                          <div className="c10-13">
                            <span>Marital Status</span>
                            <p>{ marital_status }</p>
                          </div>

                          <div className="c1-4">
                            <span>Spouse’s Name</span>
                            <p>{ spouse_name }</p>
                          </div>

                          <div className="c4-7">
                            <span>Spouse’s Address</span>
                            <p>{ spouse_address }</p>
                          </div>

                          <div className="c7-10">
                            <span>Spouse’s Employer</span>
                            <p>{ spouse_employer }</p>
                          </div>

                          <div className="c10-13">
                            <span>No of Years Employed</span>
                            <p>{ spouse_work_experience }</p>
                          </div>

                          <div className="c1-4">
                            <span>Profession of Spouse</span>
                            <p>{ spouse_profession }</p>
                          </div>

                          <div className="c4-7">
                            <span>Spouse's Annual Income</span>
                            <p>{ spouse_annual_income }</p>
                          </div>

                          <div className="c1-13 overflow-auto">
                            <span>Children/Other Dependents:</span>
                            <table className="table rtable w-100">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Age</th>
                                  <th>Relationship</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  children.map((child, index) => (
                                    <tr key={index}>
                                      <td>{ child.name }</td>
                                      <td>{ child.age }</td>
                                      <td>{ child.relationship }</td>
                                    </tr>
                                  ))
                                }
                              </tbody>
                            </table>
                          </div>

                          <div className="c1-5">
                            <span>Next-of-Kin’s Name</span>
                            <p>{ next_of_kin_name }</p>
                          </div>

                          <div className="c5-9">
                            <span>Next-of-Kin’s Relationship</span>
                            <p>{ next_of_kin_relationship }</p>
                          </div>

                          <div className="c9-13">
                            <span>Next-of-Kin’s Age</span>
                            <p>{ next_of_kin_age }</p>
                          </div>

                          <div className="c1-13">
                            <span>Next-of-Kin Address</span>
                            <p>{ next_of_kin_address }</p>
                          </div>
                        </div>
                      </div>

                      <div
                        data-label="Employment Information"
                        className="fp-mortgage-landing-preview-card mt40"
                      >
                        <div className="details-box">
                          <div className="c1-12"></div>
                          <div className="c1-5">
                            <span>Company Name</span>
                            <p>{ employer_name }</p>
                          </div>
                          <div className="c5-13">
                            <span>Company Email Address</span>
                            <p>{ employer_email }</p>
                          </div>
                          <div className="c1-5">
                            <span>Employer Phone No</span>
                            <p>{ employer_phone }</p>
                          </div>
                          <div className="c1-13">
                            <span>
                              Address of Employer (If less than three years, give name
                              of previous employer)
                            </span>
                            <p>{ employer_address }</p>
                          </div>
                        </div>
                      </div>

                      <div
                        data-label="Financial Information"
                        className="fp-mortgage-landing-preview-card mt40"
                      >
                        <div className="details-box">
                          <div className="c1-13"></div>
                          <div className="c1-7">
                            <span>
                              Employment Income (
                              <i>Total Annual Pay</i>)
                            </span>
                            <p>{ total_annual_pay }</p>
                          </div>
                          <div className="c7-13">
                            <span>
                              Employment Income (
                              <i>Monthly Gross Pay</i>)
                            </span>
                            <p>{ monthly_gross_pay }</p>
                          </div>
                          <div className="c1-7">
                            <span>
                              Employment Income (
                              <i>Monthly Net Pay</i>)
                            </span>
                            <p>{ monthly_net_pay }</p>
                          </div>
                          <div className="c7-13">
                            <span>Estimated Monthly Living Expenses</span>
                            <p>{ monthly_expenses }</p>
                          </div>

                          <div className="c1-13 overflow-auto">
                            <span>Other Source(s) of Income</span>
                            <table className="table rtable w-100">
                              <thead>
                                <tr>
                                  <th>Source</th>
                                  <th>Amount/Year (N)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  other_source_of_income.map((income, index) => (
                                    <tr
                                      key={index}
                                    >
                                      <td>{ income.source }</td>
                                      <td>{ income.amount }</td>
                                    </tr>
                                  ))
                                }
                              </tbody>
                            </table>
                            <span>Total: -</span>
                          </div>
                          <div className="c1-13 overflow-auto">
                            <span>Outstanding loans (if any)</span>
                            <table className="table rtable w-100">
                              <thead>
                                <tr>
                                  <th>Lender Name</th>
                                  <th>Loan Type</th>
                                  <th>Outstanding Amount</th>
                                  <th>Frequency</th>
                                  <th>Existing Payment</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  outstanding_loans.map((child, index) => (
                                    <tr
                                      key={index}
                                    >
                                      <td>{ child.lender_name }</td>
                                      <td>{ child.loan_type }</td>
                                      <td>{ child.outstanding_amount }</td>
                                      <td>{ child.loan_frequency }</td>
                                      <td>{ child.existing_payment }</td>
                                    </tr>
                                  ))
                                }
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div
                        data-label="Loan Information"
                        className="fp-mortgage-landing-preview-card mt40"
                      >
                        <div className="details-box">
                          <div className="c1-13"></div>
                          <div className="c1-4">
                            <span>Equity Contribution</span>
                            <p>{ down_payment }</p>
                          </div>
                          <div className="c4-7">
                            <span>Loan Amount</span>
                            <p>{ loan_amount }</p>
                          </div>
                          <div className="c7-10">
                            <span>Loan Tenure</span>
                            <p>{ loan_tenure }</p>
                          </div>
                          <div className="c10-13">
                            <span>Employer's guarantee</span>
                            <p>{ have_employer_guarantor }</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row mt-0'>
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
                          type='submit'
                          className='w-100'
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        >
                          {
                            isSubmitting ? <ButtonSpinner /> : 'submit'
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}

const mapStateToProps = ({ application, currentUser, affordability }, ownProps) => ({ ...currentUser, ...affordability, ...application });
 
export default connect(mapStateToProps)(ApplicationDetails);