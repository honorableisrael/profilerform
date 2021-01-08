export const SET_AFFORDABILITY_DATA = "SET_AFFORDABILITY_DATA";
export const SET_MORTGAGE_APPLICATION_DATA = "SET_MORTGAGE_APPLICATION_DATA";
export const SET_ERRORS = "SET_ERRORS";
export const SET_IS_AUTHENTICATED = "SET_IS_AUTHENTICATED";
export const SET_EARNING_DATA = "SET_EARNING_DATA";
export const USER_TOKEN = "token";
export const PENDING_DESTINATION = "PENDING_DESTINATION";
export const IS_LOADING = "IS_LOADING";
export const USER_DATA = "USER_DATA";
export const CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER';
export const CLEAR_EARNINGS = 'CLEAR_EARNINGS';
export const CLEAR_REQUEST = 'CLEAR_REQUEST';
export const CLEAR_AFFORDABILITY = 'CLEAR_AFFORDABILITY';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const APPLICATION_URL = "/application";
export const DASHBOARD_URL = "/user/dashboard";
export const LENDER_DASHBOARD_URL = "/lender/dashboard";
export const ADMIN_DASHBOARD_URL = "/admin/dashboard";
export const USER_PROFILE_URL = "/user/profile";
export const USER_AFFORDABILITY_URL = "/user/affordability-test";
export const USER_PROPERTY_REQUEST_URL = "/user/property-request";
export const LOGIN_PAGE_URL = "/auth/login";
export const REGISTER_URL = "/auth/register";
export const FORGOT_PASSWORD_URL = "/auth/forgot-password";
export const CHANGE_PASSWORD_CODE_URL = "/auth/change-password-code";
export const WELCOME_PAGE_URL = "/";
export const ALL_CITIES_URL = "/general/all-cities/";
export const ALL_STATES_URL = "/general/all-states";
export const PAYMENT_OPTIONS_URL = "/general/finance-option";
export const PROPERTY_TYPE_URL = "/general/all-properties-types/";
// export const BASE_URL = "https://app.financeplus.ng/api";
// export const BASE_URL = "https://staging.newhomes.ng/api";
// export const BASE_URL = "https://admin.newhomes.ng/api";
export const BASE_URL = "https://hq.newhomes.ng/api";

export const MIN_EQUITY_PERCENTAGE = 0.2;
export const SELF_EMPLOYED_MIN_EQUITY_PERCENTAGE = 0.35;
export const SET_NHF_REG_NUMBER = "SET_NHF_REG_NUMBER";
export const STORE_DATA = "STORE_DATA";
export const SET_EDIT_APPLICATION_DATA = "SET_EDIT_APPLICATION_DATA";

export const justgetittobuild = 9;
export const DEFAULT_AFFORDABILITY_DATA = {
  loan_amount: "",
  dob: "",
  monthly_payment: "",
  properties: null,
  rate: 18,
  have_additional_income: "",
  have_other_obligations: "",
  tenure: 20,
  maxLoanableAmount: "",
  other_obligations: "",
  isNhf: false,
  co_borrower: "",
  co_borrower_gross_income: "",
  co_borrower_additional_income: ""
};
export const DEFAULT_MORTGAGE_APPLICATION_DATA = {
  down_payment: "",
  property_value: "",
  property_title: "",
  property_address: ""
};
export const NON_PROTECTED_ROUTES = [
  "/affordability-test",
  "/nhf/affordability",
  "/contact",
  "/company/about",
  "/mortgage/application-type",
  "/signin",
  "/auth/register",
  "/",
  "",
  "/support/faqs",
  "/legal/privacy-policy",
  '/get-started'
];

export const DEFAULT_APP_DATA = {};
export const DEFAULT_EARNING_DATA = {monthly_income: "", additional_income: ""};
export const DEFAULT_RADIO_VALUES = ["yes", "no"];


export const sexes = ["Male", "Female"];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const printJSStyles = `
  * {
    box-sizing: border-box;
  }

  .container {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }

  .fp-mortgage-landing-preview-card {
      font-size: 20px;
      padding: 20px;
      margin-top: 20px;
      margin-bottom: 20px;
      border: 1px solid #a9a5a5;
      position: relative;
      border-radius: 5px;
      page-break-inside: avoid;
      height: fit-content;
  }

  .fp-mortgage-landing-preview-card::before {
      content: attr(data-label);
      display: block;
      position: absolute;
      top: -5px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      background-color: inherit;
      color: #2e2e2e;
      /* color: #00b1ab; */
      padding: 0 5px;
  }

  .fp-mortgage-application-preview .fp-mortgage-landing-preview-card span {
      color: #2e2e2e;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
  }

  .fp-personal-info-form span {
      font-size: 15px;
      color: #2e2e2e;
      line-height: 2px;
      font-weight: 400;
  }

  .details-box {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      column-gap: 10px;
  }

  .details-box > div {
      padding-right: 20px;
  }

  .details-box > div > p {
      display: flex;
      flex-wrap: wrap;
  }

  .details-box th {
      text-align: left;
  }

  .details-box > div span {
      font-weight: 600;
  }

  .details-box > div:not([class^='c1-']) {
      padding-left: 20px !important;
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

  .c7-13 {
      grid-column: 7 / 13;
  }

  .c1-5 {
      grid-column: 1 / 5;
  }

  .c5-13 {
      grid-column: 5 / 13;
  }

  .c5-9 {
      grid-column: 5 / 9;
  }

  .c9-13 {
      grid-column: 9 / 13;
  }
`;
