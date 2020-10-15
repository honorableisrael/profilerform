import React from 'react';

import GetStartedForm from '../GetStartedForm';
import HeroPattern from '../Resource/finance-plus-pattern.svg';


const HeroSection = () => {
  return (
    <section className="hero-section">
      <article className="hero-headline-wrapper">
        <h1 className="hero-headline">
          Home ownership begins with<br />us.<span
            >Discover great mortgage deals from trusted lenders across the
            country, and get expert advice on the right option for you. Best of
            all, we are absolutely free!</span
          >
        </h1>

        <GetStartedForm />
      </article>
      <figure className="hero-pattern-wrapper">
        <img
          className="hero-pattern"
          src={HeroPattern}
        />
      </figure>
    </section>
  );
}
 
export default HeroSection;