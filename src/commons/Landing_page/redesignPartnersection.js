import React from "react";
import Stanbic from "../../containers/Resource/new-stanbic-bank.png";
import AccessBank from "../../containers/Resource/new-access-bank.png";
import StandardChartered from "../../containers/Resource/new-standard-bank.png";
import FirstTrust from "../../containers/Resource/firsttrust.png";
import NMRC from "../../containers/Resource/nmrc.png";
import HomeBase from "../../containers/Resource/homebase.png";
import FamilyHomes from "../../containers/Resource/familyhomes.png";
import FederalMortgage from "../../containers/Resource/federal.png";
import "./landing.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const PatnersSection = () => {
  return (
    <section className="partner prtncardsply">
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={7000}
        centerMode={false}
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={true}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
            paritialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 710,
              min: 0,
            },
            items: 2,
            paritialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 710,
            },
            items: 2,
            paritialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        className=""
      >
        <div className="widtdd">
          <img src={HomeBase} className="partner-logo1" />
        </div>
        <div className="widtdd">
          <img src={FirstTrust} className="partner-logo2" />
        </div>
        <div className="widtdd">
          <img src={FederalMortgage} className="partner-logo3" />
        </div>
      </Carousel>
    </section>
  );
};

export default PatnersSection;
