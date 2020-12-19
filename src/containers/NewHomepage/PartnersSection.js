import React, { useEffect} from 'react';
// import $ from 'jquery';
// import OwlCarousel from "react-owl-carousel";
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

import Stanbic from '../Resource/new-stanbic-bank.png';
import AccessBank from '../Resource/new-access-bank.png'
import StandardChartered from '../Resource/new-standard-bank.png';
import FirstTrust from '../Resource/firsttrust.png';
import NMRC from '../Resource/nmrc.png';
import HomeBase from '../Resource/homebase.png';
import FamilyHomes from '../Resource/familyhomes.png';
import FederalMortgage from '../Resource/federal.png';
import "./NewHomepage.css";
// import Slider from 'infinite-react-carousel';
// import styled from '@emotion/styled';
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// const Wrapper = styled.div`
// .carousel-initialized{
//   width: 100%
// }
// .carousel-track{
//   display: flex;
// }
// `;

const PatnersSection = () => {
  // const settings =  {
  //   arrows: false,
  //   arrowsBlock: false,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   duration: 500,
  //   slidesToShow: 6,
  // };

  // <Wrapper>
     
    //  <Slider {...settings}>
    // useEffect(()=> {
    //   $(document).ready(function(){
    //     $(".owl-carousel").owlCarousel();
    //   });
    // },[])
      

  return (
    
    // <div className="carousel-wrapper">
    //     <Carousel infiniteLoop useKeyboardArrows autoPlay>
    // <OwlCarousel
    // loop
    // dots={false}
    // margin={5}
    // autoplay={true}
    // autoplayTimeout={3000}
    // className='partner-carousel owl-theme' style={{backgroundColor: "var(--secondary-background-color)", overflowY: "hidden", padding: "0 0", margin: "0 8%",
    // overflowX: "auto", }}
    // >
    <section className='partner-carousel' style={{backgroundColor: "var(--secondary-background-color)", overflowY: "hidden", padding: "0 0", margin: "0 8%",
    overflowX: "auto", }}>
    
      {
        [
          { title: 'access bank', img: AccessBank, id: 1 },
          { title: 'familyhomes', img: FamilyHomes , id: 2},
          { title: 'standard chartered', img: StandardChartered , id: 3},
          { title: 'stanbic bank', img: Stanbic , id: 4},
          { title: 'federal mortgage', img: FederalMortgage , id: 5},
          { title: 'first trust', img: FirstTrust , id: 6},
          { title: 'nmrc', img: NMRC , id: 7},
          { title: 'homebase', img: HomeBase , id: 8},
        ].map(({ title, img, id }) => (
          <div>
          <img
            key={id}
            src={img}
            alt={title}
            className='partner-logo'
          />
          </div>
        ))
      }
       {/* </Carousel> */}
      {/* </div>  */}
      </section>
    //  </OwlCarousel>
    // </Slider>
    // </Wrapper> 
        
  );
}
 
export default PatnersSection;