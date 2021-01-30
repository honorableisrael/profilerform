import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";




const RedsgnStepSection = () => {
  return (
    <div className="rdstepSession1">
      <Container>
        <div className="rdstepSession1__heading">
          <h1>How it works</h1>
          <p>Get on the Property ladder in 3 simple steps</p>
        </div>
        <div className="ffldd"></div>
        <div className="flefd">
        <span className="xstepcnt rdstepcnt2">1</span>
        <span className="xstepcnt rdstepcnt2">2</span>
        <span className="xstepcnt rdstepcnt2">3</span>
        </div>

        <div className="rdstepSession1__main">
          <div className="rdstepSession1__steps">
            <div className="rdstepSession1__steps--item rdstep1">
              <div className="text-center affrd">
                <span className="rdstepcnt rdstepcnt23d">1</span>
              </div>
              <span className="blkcd"></span>
              <span className="blkcd socc11"></span>
              <h2 className="mobphder">Register your profile</h2>
              <div></div>
              <h4 className="mobscnhder">
                Your journey to home ownership begins with the affordability
                test.
              </h4>
              <p>
                {" "}
                Select your preferred mortgage type, answer a few questions, and
                our unique algorithm will let you know the maximum loan you can
                afford.
              </p>
            </div>
            <div className="rdstepSession1__steps--item rdstep2 onmiddle">
              <div className="text-center affrd">
                <span className="rdstepcnt dsd1">2</span>
              </div>
              <div className="hiedd">
                {" "}
                <span className="blaad"></span>
                <span className="blaacd"></span>
              </div>
              <h2 className="mobphder">Check Affordability</h2>
              <div></div>
              <h4 className="mobscnhder">
                Using the personal and financial information you provide us,
              </h4>
              <p>
                {" "}
                We will check your credit information against lenders' criteria
                to make sure you’re eligible to apply for a home loan, and give
                you your best chance for approval.
              </p>
            </div>
            <div className="rdstepSession1__steps--item rdstep3">
              <span className="blkcdright newwidth"></span>
              <span className="blkcdright newwidth1"></span>
              <span className="rdstepcnt rdstepcnt2">3</span>
              <h2 className="mobphder">Request for a Property</h2>
              <div></div>
              <h4 className="mobscnhder">
                You are well on your way to owning your home!
              </h4>
              <p>
                {" "}
                Complete your mortgage application online in minutes; Get
                reports, monitor and track your application progress every step
                of the way! See application requirements.
              </p>
            </div>
          </div>
          <div className="rdstepscontentwrapper">
            <div className="rdstepscontent">
              <h2>Register your profile</h2>
              <div></div>
              <h4>
                Your journey to home ownership begins with the affordability
                test.
              </h4>
              <p>
                {" "}
                Select your preferred mortgage type, answer a few questions, and
                our unique algorithm will let you know the maximum loan you can
                afford.
              </p>
            </div>
            <div className="rdstepscontent">
              <h2>Check Affordability</h2>
              <div></div>
              <h4>
                Using the personal and financial information you provide us,
              </h4>
              <p>
                {" "}
                We will check your credit information against lenders' criteria
                to make sure you’re eligible to apply for a home loan, and give
                you your best chance for approval.
              </p>
            </div>
            <div className="rdstepscontent">
              <h2>Request for a Property</h2>
              <div></div>
              <h4>You are well on your way to owning your home!</h4>
              <p>
                {" "}
                Complete your mortgage application online in minutes; Get
                reports, monitor and track your application progress every step
                of the way! See application requirements.
              </p>
            </div>
          </div>
          <Link to="/auth/register">
            <span className=" rdbtn-info">Get Started for Free</span>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default RedsgnStepSection;
