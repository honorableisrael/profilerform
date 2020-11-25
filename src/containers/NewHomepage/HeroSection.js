import React from 'react';
import "./NewHomepage.css";
import {Link} from "react-router-dom";

// import GetStartedForm from '../GetStartedForm';
import Person1 from '../Resource/Rectangle.svg';
import Person2 from "../Resource/Rectangle Copy 3.svg"
import Pattern from "../Resource/Dot Pattern 1.png";
import Videopic from "../Resource/gian-paolo-aliatis-EJSNrTzz6xk-unsplash 1.png";
import Oval from "../Resource/Oval.svg";
import Vector from "../Resource/Vector.png";



const HeroSection = () => {
  return (
    <section className="heroSection">
      <div
          className="hero__vector homemainImage"
        >
         <img
            alt="hero__vector"
            src={Vector}
      />
        </div>
      
      <article className="heroSection__headline">
        <h1 className="heroSection__headline--main">
         <span>NPFPDCC</span> Profiling <br />and Home Ownership <br/> Platform
        </h1>
        <p>
          Discover great mortgage deals from trusted lenders across the
          country, and get expert advice on the right option for you. Best of
          all, we are absolutely free!
        </p>
        <Link className="btn btn-info " to="/auth/register" >
            Get Started for Free
        </Link>
        <span>Still confused? Check our 1 min video</span>
      </article>
      <div className="heroSection__images">
        <div
          className="hero__person1 homeImage"
        >
          <img
          src={Person1}
          alt="hero__person1"
        />
        </div>
        <div
          className="hero__person2 homeImage"
        >
          <img
          src={Person2}
          alt="hero__person2"
        />
        </div>
        <div
          className="hero__pattern homeImage"
        >
          <img
          src={Pattern}
          alt="hero__pattern"
        />
        </div>
        <div
          className="hero__video homeImage"
        >
          <iframe 
                src="https://www.youtube.com/embed/LQ_41yuGttA"
                title="home_Video"
          >
          </iframe>
        </div>
        <div
          className="hero__oval homeImage"
        >
          <img
          src={Oval}
          alt="hero__oval"
        />
        </div>
      </div>
    </section>
  );
}
 
export default HeroSection;