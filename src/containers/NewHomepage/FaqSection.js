import React from 'react';

import FaqItem from './FaqItem';
import FaqPattern from '../Resource/faq-color-pattern.png';


const FaqSection = () => {
  const faqs = new Array(5).fill({
    question: "How do I begin my mortgage application?",
    answer: `
      Get started through any of these convenient ways:
      Apply online: Our simple and secure online mortgage application will walk you through
      the process step by step. Our smart solution keeps track of all and prefills some of
      your information, making it easier to complete the application. Get Started Here. Speak
      with a representative: You can also connect with a Finance+ mortgage consultant and have
      a conversation – about your home financing needs, your loan choices, and how much you
      may be able to borrow. When you’re ready, your home mortgage consultant will help you
      complete an application. Call +234 (0) 809 053 3000, +234 (0) 809 063 3000
    `
  });

  return (
    <section className="faq-section">
      <div>
        {
          faqs.map((faq, index) => (
            <FaqItem
              faq={faq}
              key={index}
              pos={index + 1}
            />
          ))
        }
      </div>
      <article className="patterned-section-intro">
        <h2 className="section-heading">
          Frequently asked questions<img
            src={FaqPattern}
          /><br />
        </h2>
      </article>
    </section>
  );
}
 
export default FaqSection;