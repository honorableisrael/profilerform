import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import "./HomePage.css";

import * as Icon from "react-feather";

// import HomePageHeader from "./HomePageHeader";
import Header from "../Header";
import Footer from "../Footer";

const HomePage = ({history}) => {
  return (
    <div className='container-fluid p-0'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          Finance Plus | Finance Plus | Real Estate, NHF, Mortgages &amp; Home
          Loans
        </title>
        <link rel='canonical' href='http://financeplus.ng' />
      </Helmet>

      <Header history={history} type='homepage' isHomePage={true} />

      <section id='fp-hero-banner' className='fp-hero-banner'>
        <div className='container'>
          <div className='fp-hero-banner-pattern'></div>
          <div className='row'>
            <div className='col-md-6'>
              <div className='fp-hero-banner-text-content-buttons'>
                <div className='fp-hero-banner-text-content'>
                  <h2>Home ownership begins with us </h2>
                  <p>
                    Discover great mortgage deals from trusted lenders across
                    the country, and get expert advice on the right option for
                    you. Best of all, we are absolutely free!
                  </p>
                </div>
                <div className='fp-hero-banner-text-buttons'>
                  <Link
                    className='fp-hero-banner-text-button-theme'
                    to='/mortgage/application-type'
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='fp-hero-banner-img'></div>
            </div>
          </div>
        </div>
      </section>

      <section id='fp-partners' className='fp-partners'>
        <div className='container'>
          <div
            id='blogCarousel'
            className='carousel slide'
            data-ride='carousel'
          >
            <div className='carousel-inner'>
              <div className='carousel-item active'>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='fp-partners-icon'>
                      <div className='fp-partners-icon-img first-trust'></div>
                    </div>
                  </div>

                  <div className='col-md-4'>
                    <div className='fp-partners-icon'>
                      <div className='fp-partners-icon-img stanbic-ibtc'></div>
                    </div>
                  </div>

                  <div className='col-md-4'>
                    <div className='fp-partners-icon'>
                      <div className='fp-partners-icon-img access'></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='carousel-item'>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='fp-partners-icon'>
                      <div className='fp-partners-icon-img standard-chartered'></div>
                    </div>
                  </div>

                  <div className='col-md-4'>
                    <div className='fp-partners-icon'>
                      <div className='fp-partners-icon-img brent'></div>
                    </div>
                  </div>

                  <div className='col-md-4'>
                    <div className='fp-partners-icon'>
                      <div className='fp-partners-icon-img nmrc'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='fp-simple-steps' className='fp-simple-steps'>
        <div className='container'>
          <div className='fp-simple-steps-wrapper'>
            <div className='fp-landing-simple-steps-circle-pattern'></div>
            <div className='row'>
              <div className='col-md-6 offset-md-3'>
                <h2>Get on the property ladder in 3 simple steps</h2>
              </div>
              <div className='col-md-12'>
                <div className='fp-simple-steps-contents'>
                  <div className='row'>
                    <div className='col-md-4'>
                      <div className='fp-simple-steps-affordability-img'></div>
                      <h4>Check to see how much you can afford</h4>
                      <p>
                        Your journey to home ownership begins with the
                        affordability test. Select your preferred mortgage type,
                        answer a few questions, and our unique algorithm will
                        let you know the maximum loan you can afford.
                      </p>
                    </div>
                    <div className='col-md-4'>
                      <div className='fp-simple-steps-eligibility-img'></div>
                      <h4>See if you’re eligible to apply </h4>
                      <p>
                        Using the personal and financial information you provide
                        us, we will check your credit information against
                        lenders' criteria to make sure you’re eligible to apply
                        for a home loan, and give you your best chance for
                        approval.
                      </p>
                    </div>
                    <div className='col-md-4'>
                      <div className='fp-simple-steps-apply-now-img'></div>
                      <h4>All set, you can now apply online</h4>
                      <p>
                        You are well on your way to owning your home! Complete
                        your mortgage application online in minutes; Get
                        reports, monitor and track your application progress
                        every step of the way! See application requirements.
                      </p>
                    </div>
                  </div>
                  <div className='text-center d-none-top'>
                    <Link
                      to='/affordability-test'
                      className='fp-simple-steps-get-started-btn'
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id='fp-landing-mortgage-nhf-rates'
        className='fp-landing-mortgage-nhf-rates'
      >
        <div className='container'>
          <div className='fp-landing-mortgage-rates-line-pattern'></div>
          <div className='row'>
            <div className='col-md-8 offset-md-2 col-sm-8 offset-sm-2'>
              <div className='fp-landing-mortgage-nhf-rates-wrapper'>
                <h2 className='text-center'>Great rates from as low as</h2>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='fp-landing-mortgage-rates-content'>
                      <h4>
                        17<span className='rate'>%</span>
                      </h4>
                      <p>Interest rate per annum</p>
                      <span className='ordinary text-center'>
                        Ordinary mortgage
                      </span>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='fp-landing-nhf-rates-content'>
                      <h4>
                        6<span className='rate'>%</span>
                      </h4>
                      <p>Interest rate per annum</p>
                      <span className='nhf text-center'>NHF Loans</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id='fp-landing-why-choose-us'
        className='fp-landing-why-choose-us'
      >
        <div className='fp-landing-why-choose-us-dotted-pattern'></div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 offset-md-1 col-sm-8 offset-sm-2'>
              <div className='fp-landing-why-choose-us-wrapper'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='fp-landing-why-choose-us-text'>
                      <div className='fp-landing-why-choose-use-finance-logo'></div>
                      <h4>Home Loans Simplified</h4>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='fp-landing-why-choose-us-text-features-wrapper'>
                      <h4>Why Choose Us?</h4>
                      <div className='fp-landing-why-choose-us-text-features'>
                        <Icon.CheckCircle
                          color='#00b1ab'
                          size='30px'
                          className='mr-3'
                        />
                        No Commission
                      </div>

                      <div className='fp-landing-why-choose-us-text-features'>
                        <Icon.CheckCircle
                          color='#00b1ab'
                          size='30px'
                          className='mr-3'
                        />
                        Instant Loan Estimates
                      </div>

                      <div className='fp-landing-why-choose-us-text-features'>
                        <Icon.CheckCircle
                          color='#00b1ab'
                          size='30px'
                          className='mr-3'
                        />
                        Radical Transparency
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='fp-landing-testimonials' className='fp-landing-testimonials'>
        <div className='container'>
          <div className='fp-landing-testimonials-content-wrapper'>
            <h2>What others think</h2>
            <div className='row'>
              <div className='col-md-4'>
                <div className='fp-landing-testimonials-content'>
                  <div className='fp-landing-testimonials-rates d-flex justify-content-center mb-3 position-relative'>
                    <Icon.Star color='#ffdb4b' size='30px' className='mr-3' />
                    <Icon.Star color='#ffdb4b' size='30px' className='mr-3' />
                    <Icon.Star color='#ffdb4b' size='30px' className='mr-3' />
                    <Icon.Star color='#ffdb4b' size='30px' className='mr-3' />
                  </div>
                  <p>
                    This finance plus na baba! I had no idea getting a mortgage
                    could be this easy! Thanks again for all your help… I’m
                    loving my new home!
                  </p>
                  <div className='fp-landing-testimonial-source'>
                    <h4>Ahmed Dauda</h4>
                    <p>Lagos, Nigeria</p>
                  </div>
                </div>
              </div>

              <div className='col-md-4'>
                <div className='fp-landing-testimonials-content'>
                  <div className='fp-landing-testimonials-rates d-flex justify-content-center mb-3 position-relative'>
                    <Icon.Star color='#ffdb4b' size='30px' className='mr-3' />
                    <Icon.Star color='#ffdb4b' size='30px' className='mr-3' />
                    <Icon.Star color='#ffdb4b' size='30px' className='mr-3' />
                    <Icon.Star color='#ffdb4b' size='30px' className='mr-3' />
                  </div>
                  <p>
                    These guys are amazing! Literally saved us the stress of
                    multiple bank visits and headaches! Thank you so much! My
                    wife and I are grateful!
                  </p>
                  <div className='fp-landing-testimonial-source'>
                    <h4>Chinedu Okudili</h4>
                    <p>Lagos, Nigeria</p>
                  </div>
                </div>
              </div>

              <div className='col-md-4'>
                <div className='fp-landing-testimonials-content'>
                  <div className='fp-landing-testimonials-rates d-flex justify-content-center mb-3 position-relative'>
                    <Icon.Star color='#ffdb4b' size='30px' className='mr-3' />
                    <Icon.Star color='#ffdb4b' size='30px' className='mr-3' />
                    <Icon.Star color='#ffdb4b' size='30px' className='mr-3' />
                    <Icon.Star color='#ffdb4b' size='30px' className='mr-3' />
                  </div>
                  <p>
                    Though I haven’t applied for a mortgage yet, the advice I
                    got was spot on! They definitely know their stuff. Thank you
                    again.
                  </p>
                  <div className='fp-landing-testimonial-source'>
                    <h4>Tyrone Aboderin</h4>
                    <p>Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='fp-landing-faqs' className='fp-landing-faqs'>
        <div className='container'>
          <div className='fp-landing-faqs-contents-wrapper'>
            <h2>Frequently asked questions</h2>
            <div className='row'>
              <div className='col-md-12'>
                <div className='fp-landing-faqs-contents'>
                  <h4>How can I start my mortgage application?</h4>
                  <p>Get started through any of these convenient ways:</p>
                  <p>
                    <strong>Apply online:</strong> Our simple and secure online
                    mortgage application will walk you through the process step
                    by step. Our smart solution keeps track of all and prefills
                    some of your information, making it easier to complete the
                    application. Get Started Here. Speak with a representative:
                    You can also connect with a Finance+ mortgage consultant and
                    have a conversation – about your home financing needs, your
                    loan choices, and how much you may be able to borrow. When
                    you’re ready, your home mortgage consultant will help you
                    complete an application. Call{" "}
                    <i>+234 (0) 809 053 3000, +234 (0) 809 063 3000</i>
                  </p>
                </div>
              </div>

              <div className='col-md-12'>
                <div className='fp-landing-faqs-contents fp-faqs-border-line'>
                  <h4>Am I eligible for a mortgage?</h4>
                  <p>
                    You mortgage eligibility is determined by a few factors all
                    defined by our partner lenders – Your age, employment status
                    and record, loan amount, whether you’re applying alone or
                    with your spouse; all determine your mortgage eligibility.
                    You can take our mortgage eligibility test to confirm your
                    status.{" "}
                    <Link to='/mortgage/application-type'>
                      <i>Get Started Here</i>
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <div className='col-md-12'>
                <div className='fp-landing-faqs-contents fp-faqs-border-line'>
                  <h4>How are interest rates determined?</h4>
                  <p>
                    Interest rates are influenced by the financial markets and
                    can change at random. The changes are based on many
                    different economic indicators in the financial markets. See
                    the scroll bar below for lenders and their current rates.
                  </p>
                </div>
              </div>
              <div className='col-md-12'>
                <Link className='fp-faqs-more' to='/support/faqs'>
                  More FAQs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='fp-call-action' className='fp-call-action'>
        <div className='container'>
          <div className='fp-call-action-wrapper'>
            <h2>Ready to begin?</h2>
            <div className='fp-call-action-buttons'>
              <a
                className='fp-call-action-button-theme'
                href='/mortgage/application-type'
              >
                Get Started
              </a>
              <a
                className='fp-call-action-button-outline'
                href='mailto:support@financeplus.ng'
              >
                <Icon.Phone color='#00b1ab' size='20px' className='mr-2' />
                Speak With a Pro
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer type='homepage' />
    </div>
  );
};

export default HomePage;
