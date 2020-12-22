import React, {useRef, useEffect} from 'react';
import "./NewHomepage.css";
import {Link} from "react-router-dom";

// import GetStartedForm from '../GetStartedForm';
import Person1 from '../Resource/Rectangle.svg';
import Person2 from "../Resource/Rectangle Copy 3.svg"
import Pattern from "../Resource/Dot Pattern 1.png";
import Family from "../Resource/family.png";
import Videopic from "../Resource/gian-paolo-aliatis-EJSNrTzz6xk-unsplash 1.png";
import Oval from "../Resource/Oval.svg";
import Vector from "../Resource/Vector.png";
// import { faGasPump } from '@fortawesome/free-solid-svg-icons';
import gsap from "gsap"




const HeroSection = () => {
  // gsap.registerPlugin(ScrollTrigger);

  let firstPerson = useRef(null);
  // let secondPerson = useRef(null);
  let headline = useRef(null);

  useEffect(()=>{
    gsap.from(firstPerson, {
    //   scrollTrigger: {
    //   trigger: firstPerson,
    //   toggleActions: "restart pause reverse pause"
    // },
    duration: 1, opacity: 0, y: "random(-200, 200)", ease: "back"});
    // gsap.from(secondPerson, {duration: 1, opacity: 0, x: "random(-200, 200)", ease: "back"});
    gsap.from(headline, {y: 30, ease: "power3", opacity: 0}, 0.15, 'Start');
  },[])

  

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
        <h1 className="heroSection__headline--main" ref = {el => {headline = el}}>
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
      <div className="heroSection__images" ref = {el => {firstPerson = el}}>
        {/* <div
          className="hero__person1 homeImage"
          ref = {el => {firstPerson = el}}
        >
          <img
          src={Person1}
          alt="hero__person1"
        />
        </div>
        <div
          className="hero__person2 homeImage"
          ref = {el => {secondPerson = el}}
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
        </div> */}
        {/* <div>
          <img
           src={Family}
           alt="family"
          />
        </div> */}
      </div>
    </section>
  );
}
 
export default HeroSection;