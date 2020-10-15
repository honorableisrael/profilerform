import React from 'react';
import * as Yup from 'yup';
import { sexes } from '../constants';

import { clearCommas } from "./currencyUtils";
import { nameRegex, phoneRegex, yearRegex, firstAndLastNameRegex } from './regexUtils';
import { invalidValueErrorMessage, requiredFieldErrorMessage } from "./validationMessageUtils";


export function dateTransformer(_, originalValue) {
  const [day, month, year] = originalValue.split('/');
  const date = new Date(`${month}/${day}/${yearRegex.test(year) ? year : 'a'}`);
  return this.isType(date) ? date : originalValue;
};

export function currencyFieldTransformer(_, originalValue) {
  const cleanedValue = Number(clearCommas(originalValue));
  return cleanedValue;
};

export function numberFieldTransformer(_, originalValue) {
  const value = Number(originalValue);
  return this.isType(value) ? value : 0;
}

export const getErrorMsg = (key, errors, touched) => (
  <p className='error-message'>{touched[key] && errors[key]}</p>
);

export const validations = (() => {
  const currencyField = Yup
    .number().transform(currencyFieldTransformer)
    .typeError(invalidValueErrorMessage);
  const integer = Yup
    .number().integer('Value must be a number')
    .min(1, 'Value must be greater than one')
    .strict();

  const isSingleName = Yup
    .string()
    .min(3, 'Value must be at least three characters long')
    .matches(nameRegex, 'Value may be a sequence of alphabets, with valid hyphenation or not')
    .typeError(invalidValueErrorMessage);

  const isDoubleName = Yup
    .string()
    .matches(firstAndLastNameRegex, 'Value may be two names (sequence of alphabets, with valid hyphenation or not)')
    .typeError(invalidValueErrorMessage);
  
  const requiredString = Yup.string().required(requiredFieldErrorMessage);

  return {
    isSingleName,
    isDoubleName,
    currencyField,
    requiredCurrencyField: currencyField.required(requiredFieldErrorMessage),
    currencyFieldWithWhen: (args) => currencyField.when(...args),
    isRequiredSingleName: isSingleName.required(requiredFieldErrorMessage),
    isRequiredDoubleName: isDoubleName.required(requiredFieldErrorMessage),
    requiredString,
    email: Yup
      .string()
      .email('Invalid email address')
      .required(requiredFieldErrorMessage),
    phone: Yup
      .string()
      .matches(phoneRegex, 'Invalid phone number')
      .required(requiredFieldErrorMessage),
    sex: Yup
      .string()
      .oneOf(sexes, 'Please select a valid choice')
      .required(requiredFieldErrorMessage),
    date: Yup
      .date().transform(dateTransformer)
      .typeError(invalidValueErrorMessage)
      .required(requiredFieldErrorMessage),
    integer,
    password: requiredString.min(6, 'Password must be at least 6 characters long'),
    requiredInteger: integer.required(requiredFieldErrorMessage)
  };
})();