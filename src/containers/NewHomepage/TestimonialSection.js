import React from 'react';

import TestimonialItem from './TestimonialItem';
import TestimonialColorPattern from '../Resource/testimonials-color-pattern.svg';


const TestimonialSection = () => {
  return (
    <section className="testimonial-section">
      <div className="patterned-section-intro">
        <h2 className="light section-heading">
          Don&rsquo;t take our word for it... Take theirs.
        </h2>
        <img aria-hidden='true' src={TestimonialColorPattern} />
      </div>
      <div className="testimonial-wrapper">
        {
          new Array(4).fill({
            username: 'Chinedu Odili',
            location: 'Lagos, Nigeria',
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjIwOTIyfQ",
            testimonial: `
              This finance plus na baba! I had no idea getting a mortgage could be
              this easy! Thanks again for all your help&hellip; I&rsquo;m loving
              my new home!
            `
          }).map((details, index) => (
            <TestimonialItem key={index} {...details} />
          ))
        }
      </div>
      <div className="great-rates">
        <h2 className="light section-heading">
          Great interest rates from as low as
        </h2>
        <div>
          <h2>15<sup>%</sup> <span>/annum</span></h2>
          <p>Home Loans</p>
        </div>
        <div className=""></div>
        <div>
          <h2>6<sup>%</sup> <span>/annum</span></h2>
          <p>NHF Loans</p>
        </div>
      </div>
      <div className="testimonial-pattern"></div>
    </section>
  );
}
 
export default TestimonialSection;