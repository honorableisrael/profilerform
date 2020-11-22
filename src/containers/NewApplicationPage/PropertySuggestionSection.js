import React from 'react';
import styled from '@emotion/styled';
import { connect, useDispatch } from 'react-redux';

import PropertyAdItem from './PropertyAdItem';
import affordabilityTypes from '../../store/types/affordabilityTypes';
import affordabilityActions from '../../store/actions/affordabilityActions';
import requestActions from '../../store/actions/requestActions';
import requestTypes from '../../store/types/requestTypes';
import { clearCommas } from '../../utils/currencyUtils';


const Wrapper = styled.div`
  & > div {
    margin-bottom: 32px !important;
    margin-right: 0px !important;
  }

  /* & {
    max-width: 320px;
  } */

  .fp-property-suggestion-button-view-more {
    display: flex;
    align-items: center;
  }
  .property-suggestions-section{
    background: #e9f2e9 !important;
  }

  .fp-nh-affordability-regular-affordability-property-suggestion-list {
    background: #E9F2E9;
    /* padding: 10px 20px 0; */
    border-radius: 5px;
    width: 252px;
    margin: 0 10px 0 0;
    height: 362px;
    margin-right: 20px;
    /* border: 1px solid #e8e9ea; */
    transition: box-shadow 0.3s ease;
    /* margin-top: 30px; */
    z-index: 100;
  }

  
  &.error h3 span {
    color: #ED2939;
  }

  &.error .fp-nh-affordability-regular-affordability-property-suggestion-list {
    border: 2px solid red;
    /* box-shadow: 0px 0px 6px red; */
  }

  .fp-nh-affordability-regular-affordability-property-suggestion-list .fp-nh-affordability-regular-affordability-property-suggestion-img {
    height: 116px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-position: 50%;
    background-size: cover;
    position: relative !important;
    background-repeat: no-repeat;
    width: 100%;
  }

  .fp-nh-affordability-regular-affordability-property-property-info {
    position: relative;
    padding: 10px 20px 0;
    /* padding: 0 1rem !important; */
  }

  .fp-nh-affordability-regular-affordability-property-property-info h2 {
    color: #555;
    font-size: 16px;
    font-weight: 700;
    /* margin-top: 15px; */
  }

  .fp-nh-affordability-regular-affordability-property-property-info .fp-property-features {
    font-size: 11px;
    color: #555;
    margin-bottom: 8px;
  }

  .fp-nh-affordability-regular-affordability-property-property-info .fp-property-features img {
    height: 15px;
  }

  .fp-nh-affordability-regular-affordability-property-property-info .fp-property-name, .fp-nh-affordability-regular-affordability-property-property-info .fp-property-address {
    font-size: 10px;
    color: #999999;
    line-height: 1.5;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .fp-nh-affordability-regular-affordability-property-property-info .fp-property-address {
    font-size: 10px;
    color: #999999;
    line-height: 1.5;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .fp-nh-affordability-regular-affordability-property-property-info .fp-property-finance-options {
    display: flex;
    justify-content: space-between;
    font-size: 9px;
    font-weight: 600;
    border-top: 1px solid #f2f6f9;
    padding: 6px 0;
    margin-top: 10px;
  }

  .fp-nh-affordability-regular-affordability-property-property-info .fp-property-property-verification {
    display: flex;
    justify-content: space-between;
    font-size: 9px;
    font-weight: 600;
    border-top: 1px solid #f2f6f9;
    margin-top: -10px;
    padding: 10px 0;
  }

  .fp-property-property-verification .fp-property-document-title, .fp-property-property-verification .fp-property-building-permit {
    color: #747474;
    font-size: 9px;
    font-weight: 600;
    text-transform: capitalize;
  }

  .fp-property-property-verification .fp-property-building-permit {
    color: #747474;
    font-size: 9px;
    font-weight: 600;
    text-transform: capitalize;
  }

  .fp-property-suggestion-button {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .fp-property-suggestion-button .fp-property-suggestion-button-make-target {
    background-color: #00b1ab;
    border: 1px solid #00b1ab;
    padding: 6px 12px !important;
    line-height: 1.5;
    border-radius: 0.25rem;
    color: #fff !important;
    font-weight: 600;
    font-size: 10px;
    box-shadow: 0px 10px 14px rgba(0, 177, 171, 0.28);
  }

  .fp-property-suggestion-button .fp-property-suggestion-button-view-more {
    background-color: transparent;
    border: 1px solid #00b1ab;
    padding: 6px 12px !important;
    line-height: 1.5;
    border-radius: 0.25rem;
    color: #00b1ab !important;
    font-weight: 600;
    font-size: 10px;
  }

  @media screen and (max-width: 768px) {
    & {
      top: -60px;
      z-index: 3;
      position: fixed;
      background: #ffffff;
      width: 100vw !important;
      height: 100vh !important;
    }

    &,
    & > * {
      transition-delay: .2s !important;
    }

    &.closed {
      display: none;
      transform: translateY(100vh) !important;
    }

    &:not(.closed) {
      width: 100vw;
      height: 100vh;
      position: absolute;
      margin-top: 60px;
      padding-top: 80px;
    }

    &:not(.closed) h3 {
      top: 16px;
      position: absolute;
      text-align: center;
    }
  }
`;

const PropertySuggestionSection = ({
  closed, properties, goToEligibility, /* found, */
  setPropertyStoreData, submittedAffordability, activeTab,
  equity_contribution, max_loanable_amount, alertUser,
  selectedProperty, setSelectedProperty
}) => {
  const affords = +clearCommas(equity_contribution) + +clearCommas(max_loanable_amount);
  const filteredProperties = submittedAffordability
    ?
    (properties || [])
      .filter(({ property_price }) => +clearCommas(property_price) <= affords)
      .sort((propertyA, propertyB) => +clearCommas(propertyB.property_price) - +clearCommas(propertyA.property_price))
    : properties;
  return properties && properties.length ? (
    <Wrapper className={`property-suggestions-section ${ closed ? 'closed' : ''} ${alertUser ? ' error' : ''}`}>
      <h3>
        Property suggestions.
        {/* <span>
          Based on your input, we found you the properties below on, and I think you’d absolutely love them!
          Select one of them if it meets your expectation, otherwise click "PROCEED TO REQUEST PROPERTY"
        </span> */}
        <span>
          {
            alertUser
              ? `Please choose one these properties by clicking on "MAKE TARGET" and then "SUBMIT".
                  You can skip this step by clicking on "PROCEED TO PROPERTY REQUEST"`
              : 'You may choose from our list of projects'
          }
        </span>
      </h3>
      {
        filteredProperties.map((property) => (
          <PropertyAdItem
            key={property.id}
            {...{
              property, activeTab, submittedAffordability, goToEligibility,
              setPropertyStoreData, selectedProperty, setSelectedProperty
            }}
          />
        ))
      }
    </Wrapper>
  ) : '';
}

const mapStateToProps = ({ properties, affordability: { equity_contribution, max_loanable_amount } }, ownProps) => {
  return {
    properties: properties.data, equity_contribution, max_loanable_amount, ...ownProps
  };
};
 
export default connect(mapStateToProps)(PropertySuggestionSection);