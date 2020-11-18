import React from 'react';
import styled from '@emotion/styled';

// import PreFooter from './PreFooter';
import Footer from '../../commons/Footer';
import Header from '../../commons/Header';
// import FaqSection from './FaqSection';
import HeroSection from './HeroSection';
import StepsSection1 from './StepsSection1';
// import WhyUsSection from './WhyUsSection';
import PartnersSection from './PartnersSection';
import withNewStyles from '../../hocs/withNewStyles';
// import TestimonialSection from './TestimonialSection';
import VideoSection from "./VideoSection";


const Wrapper = styled.div`
`;

const NewHomepage = () => {
  return (
    <Wrapper>
      <Header />
      <main>
        <div className="NewHomepage">
          <HeroSection />
          <PartnersSection />
          <StepsSection1 />
          {/* <WhyUsSection />
          <TestimonialSection />
          <FaqSection /> */}
          <VideoSection />
          {/* <PreFooter /> */}
        </div>
      </main>
      <Footer />
    </Wrapper>
  );
}
 
export default withNewStyles(NewHomepage);