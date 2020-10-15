import React from 'react';
import styled from '@emotion/styled';

import PreFooter from './PreFooter';
import NewFooter from '../NewFooter';
import NewHeader from '../NewHeader';
import FaqSection from './FaqSection';
import HeroSection from './HeroSection';
import StepsSection from './StepsSection';
import WhyUsSection from './WhyUsSection';
import PartnersSection from './PartnersSection';
import withNewStyles from '../../hocs/withNewStyles';
import TestimonialSection from './TestimonialSection';


const Wrapper = styled.div`
`;

const NewHomepage = () => {
  return (
    <Wrapper>
      <NewHeader />
      <main>
        <div>
          <HeroSection />
          <PartnersSection />
          <StepsSection />
          <WhyUsSection />
          <TestimonialSection />
          <FaqSection />
          <PreFooter />
        </div>
      </main>
      <NewFooter />
    </Wrapper>
  );
}
 
export default withNewStyles(NewHomepage);