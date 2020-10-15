import React from 'react';
import styled from '@emotion/styled';


const Wrapper = styled.div`
  & {
    width: 24px;
    height: 24px;
    transform: rotate(0deg) !important;
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