import React from 'react';
import styled from '@emotion/styled';


const Wrapper = styled.div`
  & {
    transform: rotate(0deg) !important;
    width: ${props => props.size || '24px'};
    height: ${props => props.size || '24px'};
    /* transition: transform infinite; */
  }
`;

const ButtonSpinner = () => {
  return (
    <Wrapper className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </Wrapper>
  );
}
 
export default ButtonSpinner;