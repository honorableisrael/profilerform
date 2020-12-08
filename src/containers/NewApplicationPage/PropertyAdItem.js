import React, { useState } from "react";
import * as Icon from "react-feather";

import BathIcon from "../Resource/bathroom.png";
import BedIcon from "../Resource/bedroom.png";
import { formatCurrencyInput } from "../../utils/currencyUtils";
import "./PropertyAdItem.css";
import styled from "@emotion/styled";
import ButtonSpinner from "../ButtonSpinner";
import Modal from "./../../commons/Modal";


const Wrapper = styled.div`
  &.selected {
    transform: scale(1.05) !important;
    border: 2px solid #009688 !important;
  }

  .fp-property-finance-options h4 {
    font-size: 9px;
    font-weight: 600;
  }
  .fp-finance, .fp-property-status{
    display: flex;
    color: #666666 !important;
  }
  .fp-finance > p, .fp-finance > h4, .fp-property-status > p, .fp-property-status > h4{
    margin-bottom: 5px !important;
  }
  .fp-property-address{
    margin-bottom: 10px !important;
  }
  .fp-finance > p{
    padding-left: 10px;
    color:var(--red-color);
  }
  .fp-property-status > p{
    padding-left: 10px;
    color:var(--green-color);
  }

  button:disabled {
    background-color: #999 !important;
  }

/* 
  input[type='radio'] {
    z-index: 2;
    top: 8px;
    left: 8px;
    width: 16px;
    height: 16px;
    position: absolute !important;
  } */
`;

const PropertyAdItem = ({
  property,
  activeTab,
  goToEligibility,
  selectedProperty,
  setSelectedProperty,
  setPropertyStoreData,
  submittedAffordability,
  mortgageApplicationData,
  setMortgageApplicationData,
}) => {
  // const baseImageUrl = "https://account.newhomes.ng";
  const [loading, setLoading] = useState(false);
  const { property_cover_image, id } = property;
  const isSelected = id === (selectedProperty || {}).id;
  const [modalStatus, setModalStatus] = useState(false);
  return (
    <Wrapper className={`fp-nh-affordability-regular-affordability-property-suggestion-list${isSelected ? ' selected' : ''}`}>
      {/* <input
        type="radio"
        checked={isSelected}
        name="interested-property"
        aria-label='Property of interest'
      /> */}
      <div
        className='fp-nh-affordability-regular-affordability-property-suggestion-img'
        //style={{ backgroundImage: `url(${baseImageUrl}/${property_image})` }}
        style={{ backgroundImage: `url(${property_cover_image})` }}
      ></div>
      <div className='fp-nh-affordability-regular-affordability-property-property-info'>
        <div className='fp-property-name'>{property.property_name}</div>
        <div className='fp-property-address'>
          {property.property_city}, {property.property_state}
        </div>
        <h2>
          {property.currency_symbol}{" "}
          {formatCurrencyInput(property.property_price)}
        </h2>
        <div className='fp-property-features'>
          <img className='mr-2' src={BedIcon} alt='Bed Icon' />
          {property.property_bedrooms
            ? `${property.property_bedrooms} bed`
            : "N/A"}{" "}
          <img className='ml-2' src={BathIcon} alt='Bath Icon' />
          &nbsp;
          {property.property_bathrooms
            ? `${property.property_bathrooms} bath`
            : "N/A"}{" "}
        </div>
        <div className='fp-property-finance-options'>
          <div className='fp-finance'>
            <h4>Finance Status: </h4>
            <p>Not Available</p>
          </div>
          <div className='fp-property-status'>
            <h4>Property Status: </h4>
            <p>Off plan</p>
          </div>
        </div>
        {/* <div className='fp-property-property-verification'>
          <div className='fp-property-document-title'>
            Property Title
            <Icon.CheckCircle className='ml-1' size='13px' color='#bfbfbf' />
          </div>
          <div className='fp-property-building-permit'>
            Building permit
            <Icon.CheckCircle
              className='ml-1 font-bold'
              size='13px'
              color='#57b40b'
            />
          </div>
        </div> */}
        <div className='fp-property-suggestion-button'>
          <button
            disabled={activeTab === 0 || !submittedAffordability || loading || isSelected}
            onClick={async ({ target }) => {
              if (setMortgageApplicationData) {
                const { title_docs, property_price_raw, property_full_address } = property;
                const propertyTitle = ['others', 'not available']
                  .includes(title_docs.toLowerCase()) ? '' : title_docs;
                setMortgageApplicationData({
                  ...mortgageApplicationData,
                  property_value: property_price_raw,
                  property_address: property_full_address,
                  property_title: propertyTitle
                });
                if (goToEligibility) goToEligibility({ target });
              } else if (setPropertyStoreData) {
                setSelectedProperty(property);
                {/* setLoading(true) */}
                {/* await setPropertyStoreData(property); */}
                {/* setLoading(false); */}
              }
            }}
            className='fp-property-suggestion-button-make-target item-btn'
          >
            {
              loading ? <ButtonSpinner size='16px' /> : (
                <>
                  <Icon.Target className='mr-1' size='13px' color='#ffffff' />
                  Choose this property
                </>
              )
            }
          </button>
        </div>
        
      </div>
      <a
            // href={`https://newhomes.ng/find-property/${property.slug}`}
            // target='_blank'
            rel='noopener noreferrer'
            className='fp-property-suggestion-button-view-more'
            data-toggle="modal" data-target="#myModal"
            // onClick={() => setModalStatus(true)}
      >
            <Icon.Eye className='mr-1' size='40px' color='#0fbc49' />
            
       </a>
            
      {/* <!-- Modal --> */}
      {/* { modalStatus && (<Modal closeModal={() => setModalStatus(false)}> <p>The content of the modal</p></Modal>)} */}
        
    </Wrapper>
  );
};

export default PropertyAdItem;
