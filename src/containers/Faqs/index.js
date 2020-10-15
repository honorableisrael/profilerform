import React, {Component} from "react";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./Faqs.css";
export default class Faqs extends Component {
  render() {
    return (
      <div className='container-fluid px-0'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>
            FAQs - Finance Plus | Real Estate, NHF, Mortgages &amp; Home Loans
          </title>
          <link rel='canonical' href='http://financeplus.ng/support/faqs' />
        </Helmet>
        <Header history={this.props.history} type='others' />
        <section id='fp-landing-faqs' className='fp-landing-faqs'>
          <div className='fp-landing-faqs-circle-pattern'></div>
          <div className='fp-landing-faqs-contents-header-wrapper'>
            <h2 className='text-sm-center text-md-center text-lg-center text-xs-center'>
              Frequently asked questions
            </h2>
          </div>
          <div className='container'>
            <div className='fp-landing-faqs-contents-wrapper faqs'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='fp-landing-faqs-contents'>
                    <h4>How can I start my mortgage application?</h4>
                    <p>Get started through any of these convenient ways:</p>
                    <p>
                      <strong>Apply online:</strong> Our simple and secure
                      online mortgage application will walk you through the
                      process step by step. Our smart solution keeps track of
                      all and prefills some of your information, making it
                      easier to complete the application. Get Started Here.
                      Speak with a representative: You can also connect with a
                      Finance+ mortgage consultant and have a conversation –
                      about your home financing needs, your loan choices, and
                      how much you may be able to borrow. When you’re ready,
                      your home mortgage consultant will help you complete an
                      application. Call{" "}
                      <i>+234 (0) 809 053 3000, +234 (0) 809 063 3000</i>
                    </p>
                  </div>
                </div>

                <div className='col-md-12'>
                  <div className='fp-landing-faqs-contents fp-faqs-border-line'>
                    <h4>Am I eligible for a mortgage?</h4>
                    <p>
                      You mortgage eligibility is determined by a few factors
                      all defined by our partner lenders – Your age, employment
                      status and record, loan amount, whether you’re applying
                      alone or with your spouse; all determine your mortgage
                      eligibility. You can take our mortgage eligibility test to
                      confirm your status.{" "}
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
                      different economic indicators in the financial markets.
                      See the scroll bar below for lenders and their current
                      rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer type='homepage' />
      </div>
    );
  }
}
