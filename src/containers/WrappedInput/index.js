import React from 'react';
import styled from '@emotion/styled';


const nestedRegex = /[\[\].]/g;

const ErrorWrapper = styled.div`
  & {
    position: relative;
    /* margin-bottom: ${props => props.withMargin ? '16px' : '0px'}; */
  }

  .error-message {
    /* position: absolute; */
  }
`;

const extractNestedError = (name, touched, errors) => {
  let extractedError = null;
  let extractedTouch = null;
  if (nestedRegex.test(name)) {
    try {
      const extractedNames = name.split(nestedRegex).filter(Boolean);
      for (let i = 0; i < extractedNames.length; i++) {
        const current = extractedNames[i];
        extractedError = (extractedError || errors)[current];
        extractedTouch = (extractedTouch ||touched)[current];
      }
    } catch (error) { return {}; }
  } else { return {}; };

  return { extractedError, extractedTouch };
}

const WrappedInput = ({ append, prepend, ...rest }) => {
  return (
    <div className="input-group">
      {
        prepend ? (
          <div className="input-group-prepend">
            <span className="input-group-text">{prepend}</span>
          </div>
        ) : ''
      }
      <input className='form-control' {...rest} />
      {
        append ? (
          <div className="input-group-append">
            <span className="input-group-text">{append}</span>
          </div>
        ) : ''
      }
    </div>
  );
};


export const WrappedInputWithError = ({ errors, touched, withMargin, ...rest }) => {
  const { extractedError, extractedTouch } = extractNestedError(rest.name, touched, errors)
  return (
    <ErrorWrapper withMargin={withMargin}>
      <WrappedInput {...rest} />
      {
        (() => {
          const { name } = rest;
          const error = extractedError || errors[name];
          return (error && (extractedTouch || touched[name])) ? (
            <div className='error-message'>{error}</div>
          ) : ''
        })()
      }
    </ErrorWrapper>
  );
};

export const WrappedSelect = ({ placeholder, options, textKey, extractValue, ...rest }) => {
  return (
    <div className="input-group">
      <select className='form-control' {...rest}>
        {
          placeholder ? (
            <option value='' defaultValue>{placeholder}</option>
          ) : ''
        }
        {
          options.map((val, index) => {
            const text = textKey ? val[textKey] : val;
            const value = typeof extractValue === 'function' ? extractValue(val) : val;
            return <option key={index} value={value}>{text}</option>;
          })
        }
      </select>
    </div>
  );
};

export const WrappedSelectWithError = ({ errors, touched, withMargin, ...rest }) => {
  const { extractedError, extractedTouch } = extractNestedError(rest.name, touched, errors);
  return (
    <ErrorWrapper withMargin={withMargin}>
      <WrappedSelect {...rest} />
      {
        (() => {
          const { name } = rest;
          const error = extractedError || errors[name];
          return (error && (extractedTouch || touched[name])) ? (
            <div className='error-message'>{error}</div>
          ) : ''
        })()
      }
    </ErrorWrapper>
  );
};
 
export default WrappedInput;