import React from "react";

import "./PropertySuggestionList.css";
import PropertyAdItem from "../NewApplicationPage/PropertyAdItem";

const PropertySuggestionList = ({
  properties,
  mortgageApplicationData,
  setMortgageApplicationData,
  goToEligibility
}) => {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='container-fluid'>
          <div className='fp-nh-affordability-regular-affordability-property-suggestion-content'>
            <div className='d-flex position-relative'>
              {properties.properties.map(property => (
                <PropertyAdItem
                  key={property.id}
                  {...{
                    property,
                    mortgageApplicationData,
                    setMortgageApplicationData,
                    goToEligibility
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySuggestionList;
