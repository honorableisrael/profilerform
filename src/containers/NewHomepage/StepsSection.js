import React from 'react';

import GetStartedForm from '../GetStartedForm';
import StepsBg from '../Resource/financeplus-steps-track-bg.svg';
import ApplicationIcon from '../Resource/steps-application-icon.svg';
import EligibilityIcon from '../Resource/steps-check-eligibility-icon.svg';
import CheckAffordabilityIcon from '../Resource/check-affordability-icon.svg';


const StepsSection = () => {
  return (
    <section className="steps-section">
      <h2 className="section-heading">
        Get on the property<br />ladder in 3 simple steps
      </h2>
      <div className="steps-wrapper">
        <div className="fiplus-step">
          <div className="step-icon-wrapper">
            <div className="step-count">
              <span>1</span>
            </div>
            <img
              className="step-icon"
              src={CheckAffordabilityIcon}
            />
          </div>
          <article className="step-info-wrapper">
            <h3 className="step-info-heading">
              Check to see how much you can afford.
            </h3>
            <p className="step-info">
              <span className="step-info-highlight"
                >Your journey to home ownership begins with the affordability
                test.</span
              >Select your preferred mortgage type, answer a few questions, and
              our unique algorithm will let you know the maximum loan you can
              afford.
            </p>
          </article>
        </div>
        <div className="fiplus-step">
          <div className="step-icon-wrapper">
            <div className="step-count">
              <span>2</span>
            </div>
            <img
              className="step-icon"
              src={EligibilityIcon}
            />
          </div>
          <article className="step-info-wrapper">
            <h3 className="step-info-heading">
              See if you&rsquo;re eligible to apply.
            </h3>
            <p className="step-info">
              <span className="step-info-highlight"
                >Using the personal and financial information you provide
                us,</span
              >We will check your credit information against lenders&apos;
              criteria to make sure you&rsquo;re eligible to apply for a home
              loan, and give you your best chance for approval.
            </p>
          </article>
        </div>
        <div className="fiplus-step">
          <div className="step-icon-wrapper">
            <div className="step-count">
              <span>3</span>
            </div>
            <img
              className="step-icon"
              src={ApplicationIcon}
            />
          </div>
          <article className="step-info-wrapper">
            <h3 className="step-info-heading">
              All set, you can now apply online.
            </h3>
            <p className="step-info">
              <span className="step-info-highlight"
                >You are well on your way to owning your home!</span
              >Complete your mortgage application online in minutes; Get
              reports, monitor and track your application progress every step of
              the way! See application requirements.
            </p>
          </article>
        </div>
        <img
          src={StepsBg}
          className="steps-track"
        />
        <h3 className="step-info-heading">Ready to begin?</h3>
      </div>

      <GetStartedForm />

      <div className="steps-section-pattern"></div>
      <div className=" separator"></div>
    </section>
  );
}
 
export default StepsSection;