import styled from '@emotion/styled';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


const Wrapper = styled.div`
  /* //////////////////////////////////////////
  ////////////////////////////////////////////
  ////////////////////////////////////////////
  //////////// Table of Content //////////////
  ////////////////////////////////////////////
  ////////////////////////////////////////////
  ////////////////////////////////////////////

    1.Declaring Variables
      1a. Colors
      1b. Typography
      1c. Reusuables
    2.General Styles
    3.Typography
    4.Home Page Layouts
      4a. Main Wrapper (Homepage Wrapper)
      4b. Header
      4c. Hero
      4d. Partners
      4d. Steps Section
      4e. Benefits Section (Why Us)
      4f. Testimonials
      4g. FAQs
      4h.	Prefoot
      4i.	Footer

    5.Components
      5a. Buttons
      5b. Form & Input Fields

    6. Select Mortgage Page

    7. Application Page */
  /* ////////////////////////////////////////
  //////// 1. Declaring Variables //////////
  //////////////////////////////////////// */
  :root {
    /* ///// 1a. Colors /////// */
    /* Main Colors */
    --primary-color: #03339a;
    --accent-color: var(--accent-color);
    /* Base Colors */
    --white-color: #fff;
    --black-color: #4e4e4e;
    --off-white: #f6f6f6;
    --pale-navy-blue: #ccdcff;
    /* Other Colors */
    --pastel-green: #98dfaf;
    --navy-blue: #124bc6;
    --blueberry-blue: #548aff;
    --faux-gin: #deefb7;
    --sky-blue: #abd2fa;
    --dark-blue: #172f61;
    --raisin-black: #262626;
    --nero-black: #292929;
    --footer-text-color: #a0a0a0;
    /* Color Gradient */
    --blue-black-gradient: linear-gradient(180deg, #03339a 0%, #292929 100%);
    /* ////// 1b.Typography /////// */
    --main-font: "Neue Haas Grotesk", Lato, sans-serif;
    /* ////// 1c.Reusables ///////// */
    --content-padding: 0 10%;
  }

  /* ////////////////////////////////////////
  //////////// 2. General Styles ///////////
  //////////////////////////////////////// */
  /* Resetting Defaults */
  * {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }

/*   
  html,
  body,
  section,
  aside,
  nav,
  footer,
  main,
  figure,
  ul,
  ol,
  h1 {
    margin: 0;
    padding: 0;
  } */

  html {
    scroll-behavior: smooth;
  }

  /* :focus {
      display: none;
  } */
  /* Defining General Styles */
  /* ////////////////////////////////////////
  ///////////// 3. Typography //////////////
  //////////////////////////////////////// */
  /* @font-face {
    font-family: "Neue Haas Grotesk";
    src: url("./fonts/NHaasGrotesk-Bd.ttf") type("truetype");
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: "Neue Haas Grotesk";
    src: url("./fonts/NHaasGrotesk-Md.ttf") type("truetype");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: "Neue Haas Grotesk";
    src: url("./fonts/NHaasGrotesk-Rg.ttf") type("truetype");
    font-weight: normal;
    font-style: normal;
  } */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  label,
  a, li {
    font-family: var(--main-font);
  }

  /* ////////////////////////////////////////
  ///////////// 4. Layouts //////////////
  //////////////////////////////////////// */
  /* ///////// 4a. Main Wrapper  (Homepage)//////// */
  .main-wrapper {
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr;
        grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }

  /* ///////// 4b. Header & Nav //////// */
  /* Nav Structure */
  .nav-wrapper {
    height: 60px;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    background: var(--primary-color);
    will-change: initial;
    z-index: 1000;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    -webkit-box-shadow: 0px 46px 40px rgba(0, 0, 0, 0.05);
            box-shadow: 0px 46px 40px rgba(0, 0, 0, 0.05);
  }

  .nav-bar {
    display: -ms-grid;
    display: grid;
    padding: 0 20px;
    -ms-grid-columns: auto 1fr;
        grid-template-columns: auto 1fr;
    -ms-grid-rows: auto;
        grid-template-rows: auto;
    width: 100%;
    height: 100%;
    grid-column-gap: 20px;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }

  /* Nav Content - Logo */
  .logo {
    width: 110px;
    height: auto;
  }

  /* Nav Content - Menu Items & Structure */
  .nav-menu {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
  }

  .nav-menu li {
    display: inline-block;
  }

  .nav-menu a {
    font-size: 14px;
    line-height: 20px;
    text-decoration: none;
    color: var(--pale-navy-blue);
    font-weight: bold;
    opacity: 0.5;
    padding: 10px 20px;
    cursor: pointer;
    -webkit-transition: opacity 490ms ease-in-out;
    transition: opacity 490ms ease-in-out;
  }

  .nav-menu a:hover {
    opacity: 1;
  }

  .nav-menu a:active {
    opacity: 1;
  }

  .nav-menu .acc-btn {
    opacity: 1;
  }

  .nav-menu .acc-btn.highlight {
    color: var(--white-color);
    background: var(--accent-color);
    border-radius: 7px;
  }

  /* Nav Content - Mobile Menu */
  .toggle-nav {
    display: none;
  }

  .toggle-nav-icon {
    height: 100%;
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    margin-left: auto;
  }

  .toggle-nav-icon span {
    width: 30px;
    position: relative;
    border-radius: 2px;
    background-color: var(--white-color);
    height: 2px;
    display: block;
  }

  .toggle-nav-icon span::before {
    content: "";
    display: block;
    background-color: var(--white-color);
    height: 2px;
    border-radius: 2px;
    position: absolute;
    top: 7px;
    right: 0;
    width: 20px;
  }

  .toggle-nav-icon span::after {
    content: "";
    display: block;
    background-color: var(--white-color);
    height: 2px;
    border-radius: 2px;
    position: absolute;
    bottom: 7px;
    right: 0;
    width: 16px;
  }

  .toggle-nav:checked ~ .nav-menu {
    height: 100vh;
  }

  .toggle-nav:checked ~ .nav-menu span li {
    opacity: 1;
  }

  @media (max-width: 1023px) {
    .nav-menu {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
      width: 100%;
      height: 0;
      -webkit-box-align: space-between;
          -ms-flex-align: space-between;
              align-items: space-between;
      -webkit-box-pack: stretch;
          -ms-flex-pack: stretch;
              justify-content: stretch;
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--blue-black-gradient);
      z-index: 999;
      border-top: 1px solid var(--nero-black);
      overflow: hidden;
      -webkit-transition: height 0.6s cubic-bezier(0.42, 0, 0.58, 1);
      transition: height 0.6s cubic-bezier(0.42, 0, 0.58, 1);
    }
    .nav-menu::after {
      content: '© Afreal Limited';
      left: 20px;
      bottom: 20px;
      right: 0;
      position: absolute;
      font-family: var(--main-font);
      font-size: 10px;
      color: var(--pale-navy-blue);
      opacity: .5;
    }
    .nav-menu span li {
      display: -ms-grid;
      display: grid;
      -ms-grid-rows: ()[auto];
          grid-template-rows: repeat(auto);
      border-bottom: 0.5px solid var(--nero-black);
      opacity: 0;
      -webkit-transition: opacity 0.5s ease-in-out;
      transition: opacity 0.5s ease-in-out;
    }
    .nav-menu span a,
    .nav-menu span button {
      font-size: 22px !important;
      color: var(--white-color) !important;
      padding: 24px !important;
    }

    .nav-menu span button {
      display: flex;
      justify-content: start;
      height: inherit;
    }

    .nav-menu span .acc-btn.highlight {
      color: var(--accent-color);
      background-color: transparent;
    }
  }

  @media (min-width: 1024px) {
    .toggle-nav-icon {
      display: none;
    }
  }

  /* ///////// 4c. Hero Section //////// */
  /* Hero Section */
  .hero-section {
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: (minmax(300px, 1fr))[auto-fit];
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    -ms-grid-rows: auto;
        grid-template-rows: auto;
    background: var(--primary-color);
    width: 100%;
    grid-column-gap: 20px;
    height: 86vh;
    grid-gap: 20px;
    padding: var(--content-padding);
  }

  .hero-section .get-started {
    margin-top: 24px;
  }

  /* Hero Headline */
  .hero-headline-wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    height: 100%;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
  }

  .hero-headline {
    font-size: 60px;
    /* font-size: min(50vw, 88px); */
    font-weight: 900;
    color: var(--pale-navy-blue);
    line-height: 99.2%;
    position: relative;
    margin-bottom: 7vh;
  }

  .hero-headline span {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    position: absolute;
    width: 60%;
    border-left: 1px solid var(--pale-navy-blue);
    padding-left: 20px;
    margin: 30px 20px;
  }

  .get-started {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 54px;
    max-width: 500px;
    position: relative;
  }

  .get-started * {
    border-radius: 5px;
    border: none;
    font-size: 14px;
    font-weight: 900;
  }

  .get-started input {
    padding: 20px;
    width: 100%;
    color: var(--black-color);
  }

  .get-started button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: var(--accent-color);
    color: var(--white-color);
    width: 45%;
  }

  /* Hero Pattern */
  .hero-pattern-wrapper {
    position: relative;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
  }

  .hero-pattern {
    position: absolute;
    top: 0;
    width: auto;
    height: 132.2%;
  }

  @media (min-width: 1024px) and (max-width: 1280px) {
    .hero-pattern-wrapper {
      -o-object-fit: contain;
        object-fit: contain;
      overflow: hidden;
    }
    .hero-pattern-wrapper .hero-pattern {
      position: relative;
    }
  }

  @media screen and (max-width: 1023px) {
    .hero-pattern-wrapper {
      display: none;
    }
  }

  @media screen and (max-width: 320px) {
    .hero-section {
      display: block;
      padding: 0 20px;
      grid-gap: 0;
      overflow: hidden;
    }
    .hero-section .hero-headline {
      font-size: 3em;
    }
    .hero-section .hero-headline span {
      position: relative;
      display: block;
      border-left: none;
      width: 100%;
      margin: 0;
      padding: 20px 0 0 0;
    }
  }

  /* ///////// 4d. Partners Carousel //////// */
  /* Partner Wrapper */
  .partner-carousel {
    height: 120px;
    /* width: 100vw; */
    padding: 0 10%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: flex-start;
  }

  @media screen and (max-width: 1023px) {
    .partner-carousel {
      /* height: 120px */
      /* width: 100vw */
      /* padding: 0 10% */
      /* display: flex */
      /* align-items: center */
      /* justify-content: flex-start */
      overflow: scroll;
    }
  }

  .partner-logo {
    height: 40px;
    margin-right: 60px;
  }

  /* ///////// 4d. Steps Section //////// */
  /* Steps Wrapper Wrapper */
  .steps-section {
    position: relative;
    padding: 15% 10% 0 10%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    /* padding: var(--content-padding) */
    /* overflow: hidden */
  }

  .steps-section + {
    z-index: 2;
  }

  .steps-section .steps-section-pattern {
    position: absolute;
    height: 1381px;
    width: 611px;
    background-color: var(--off-white);
    top: 0;
    left: -5%;
    z-index: -1;
    border: none;
    border-radius: 0px 0px 500px 0px;
  }

  .steps-section .steps-track {
    padding: 30px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    z-index: -0;
    margin: 0 auto;
  }

  .steps-section .separator {
    position: absolute;
    width: 54%;
    height: 1px;
    left: 0;
    top: 0;
    z-index: -2;
    background-color: var(--off-white);
  }

  .steps-section .section-heading {
    text-align: center;
    margin-bottom: 5%;
  }

  .steps-section .get-started {
    -ms-flex-item-align: center;
        -ms-grid-row-align: center;
        align-self: center;
    width: 100%;
    margin-bottom: 90px;
  }

  .steps-section .get-started input {
    background: var(--off-white);
  }

  @media screen and (max-width: 1024px) {
    .steps-section {
      position: relative;
      padding: 15% 20px 0 20px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
      overflow: hidden;
    }
    .steps-section .section-heading {
      margin-bottom: 70px;
    }
    .steps-section .steps-track {
      display: none;
    }
    .steps-section .steps-section-pattern {
      left: -25%;
    }
    .steps-section .separator {
      width: 100%;
    }
    .steps-section .fiplus-step {
      padding: 0%;
      margin-bottom: 13%;
    }
    .steps-section .fiplus-step .step-icon-wrapper {
      margin-bottom: 50px;
    }
    .steps-section .fiplus-step .step-icon-wrapper .step-count {
      top: -10%;
      bottom: 0;
      left: 0;
    }
    .steps-section .fiplus-step .step-info-wrapper {
      width: 40%;
      margin-bottom: 10px;
    }
    .steps-section .steps-wrapper .fiplus-step:nth-child(2) .step-count {
      top: -10%;
      bottom: 0;
      left: 0%;
      right: 0;
    }
  }

  @media screen and (max-width: 320px) {
    .steps-section .fiplus-step {
      padding: 0%;
    }
    .steps-section .fiplus-step .step-info-wrapper {
      width: 90%;
      margin-bottom: 70px;
    }
    .steps-section .get-started {
      width: 100%;
    }
  }

  .steps-wrapper {
    position: relative;
    padding-top: 5%;
  }

  .steps-wrapper * {
    z-index: 1;
  }

  .steps-wrapper .fiplus-step:nth-child(2) {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
        -ms-flex-direction: row-reverse;
            flex-direction: row-reverse;
  }

  .steps-wrapper .fiplus-step:nth-child(2) .step-icon-wrapper {
    background: var(--faux-gin);
  }

  .steps-wrapper .fiplus-step:nth-child(2) .step-count {
    left: 150%;
  }

  .steps-wrapper .fiplus-step:nth-child(3) {
    margin-bottom: 15%;
  }

  .steps-wrapper .fiplus-step:nth-child(3) .step-icon-wrapper {
    background: var(--sky-blue);
  }

  .fiplus-step {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    color: var(--black-color);
    padding: 0 20%;
    margin: 0 0 20% 0;
    -webkit-box-align: start;
        -ms-flex-align: start;
            align-items: flex-start;
    -webkit-box-pack: space-evenly;
        -ms-flex-pack: space-evenly;
            justify-content: space-evenly;
  }

  .step-icon-wrapper {
    background-color: var(--accent-color);
    height: 300px;
    width: 220px;
    border-radius: 0px 0px 100px 0px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    position: relative;
  }

  .step-icon-wrapper .step-icon {
    width: 100px;
  }

  .step-count {
    position: absolute;
    width: 70px;
    height: 70px;
    color: var(--white-color);
    background: var(--accent-color);
    border-radius: 100%;
    top: 0;
    left: -80%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-shadow: 0px 33px 21px rgba(0, 0, 0, 0.07);
            box-shadow: 0px 33px 21px rgba(0, 0, 0, 0.07);
  }

  .step-count span {
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 125.2%;
  }

  .step-info-wrapper {
    width: 50%;
  }

  .step-info-heading {
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 125.2%;
  }

  .step-info-highlight {
    display: block;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    margin: 20px 0;
  }

  .step-info {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 23px;
  }

  /* .steps-wrapper ~ .step-info-heading {
      text-align: center;
      margin-bottom: 40px;


  } */
  .steps-wrapper > .step-info-heading {
    text-align: center;
    margin-bottom: 40px;
  }

  /* ///////// 4e. Why Us Section //////// */
  /* Why us Wrapper */
  .why-us-section {
    background: var(--off-white);
    padding: 20% 10% 10% 10%;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(2, auto) 200px;
    grid-row-gap: 60px;
  }

  .why-us-section .section-heading {
    -ms-grid-column-align: center;
        justify-self: center;
    text-align: center;
  }

  .why-us-section .benefit-wrapper {
    /* display: -ms-grid;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    -ms-grid-columns: (minmax(250px, 1fr))[auto-fit];
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 120px;
    grid-gap: 70px;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center; */
    display: grid;
    grid-gap: 70px;
    grid-auto-rows: 120px;
    grid-template-columns: repeat(3, 1fr);
  }

  .benefit {
    display: -ms-grid;
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 10px;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }

  .benefit div {
    width: 70px;
    height: 70px;
    border-radius: 0 50% 0 0;
    background: var(--accent-color);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }

  .benefit div .fas {
    color: var(--white-color);
    font-size: 20px;
  }

  .benefit h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
  }

  /* ///////// 4f. Testimonial Section //////// */
  /* Why us Wrapper */
  .testimonial-section {
    position: relative;
    background: var(--blue-black-gradient);
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: (minmax(300px, 1fr))[auto-fit];
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    -ms-grid-rows: auto;
        grid-template-rows: auto;
    grid-auto-rows: auto;
    grid-gap: 50px;
    padding: 20% 10% 0% 10%;
  }

  .testimonial-section * {
    z-index: 1;
  }

  .great-rates {
    width: 1268px;
    height: 339px;
    left: -5%;
    top: -200px;
    padding: 0 10% 0 15%;
    background: var(--primary-color);
    -webkit-box-shadow: 25px 111px 110px rgba(0, 0, 0, 0.09);
            box-shadow: 25px 111px 110px rgba(0, 0, 0, 0.09);
    border-radius: 0px 500px 0px 0px;
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-line-pack: center;
        align-content: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }

  .great-rates * {
    margin: 0 15px;
  }

  .great-rates div {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
  }

  .great-rates div h2 {
    font-size: 88px;
    font-weight: 900;
    color: var(--white-color);
  }

  .great-rates div sup {
    font-style: normal;
    font-weight: bold;
    font-size: 52px;
    line-height: 87.2%;
    position: relative;
    top: 10px;
    vertical-align: super;
  }

  .great-rates div span {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 23px;
    position: absolute;
    right: 20px;
    top: 55%;
  }

  .great-rates div p {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 23px;
    color: var(--white-color);
    background: var(--accent-color);
    border-radius: 20px 0 0 0;
    text-align: center;
    padding: 2px 5px;
  }

  .testimonial-pattern {
    position: absolute;
    width: 698px;
    height: 1410px;
    left: -30px;
    top: 0;
    background: var(--dark-blue);
    border-radius: 0px 0px 500px 0px;
    z-index: 0;
  }

  .patterned-section-intro {
    padding-left: 20%;
    padding-right: 5%;
  }

  .patterned-section-intro * {
    margin: 50px 0;
  }

  .testimonial-wrapper {
    padding-right: 20%;
    padding-left: 5%;
    padding-top: 70px;
    height: 400px;
  }

  .testimonial-wrapper :nth-child(1) {
    z-index: 4;
  }

  .testimonial-wrapper :nth-child(2) {
    z-index: 3;
  }

  .testimonial-wrapper :nth-child(3) {
    z-index: 2;
    -webkit-box-shadow: -1px 94px 80px rgba(0, 0, 0, 0.15);
            box-shadow: -1px 94px 80px rgba(0, 0, 0, 0.15);
  }

  .testimonial-wrapper :nth-child(4) {
    -webkit-box-shadow: -1px 94px 80px rgba(0, 0, 0, 0.15);
            box-shadow: -1px 94px 80px rgba(0, 0, 0, 0.15);
  }

  .testimonial {
    background: var(--white-color);
    border-radius: 0px 100px 0px 0px;
    position: relative;
    padding: 30px 60px 30px 30px;
    -webkit-box-shadow: -1px 94px 40px rgba(0, 0, 0, 0.21);
            box-shadow: -1px 94px 40px rgba(0, 0, 0, 0.21);
    margin-bottom: 60px;
  }

  .testimonial p {
    font-size: 14px;
    line-height: 139.5%;
    color: var(--black-color);
  }

  .testimonial p span {
    display: block;
    margin-top: 20px;
  }

  .testimonial img {
    height: 100px;
    width: 100px;
    -o-object-fit: cover;
      object-fit: cover;
    border-radius: 100%;
    right: -20px;
    bottom: -30px;
    position: absolute;
  }

  @media screen and (max-width: 1023px) {
    .testimonial-section {
      padding: 0;
      grid-gap: 0;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
    }
    .testimonial-section .testimonial-pattern {
      display: none;
    }
    .great-rates {
      -webkit-box-ordinal-group: 2;
          -ms-flex-order: 1;
              order: 1;
      -ms-grid-column-align: center;
          justify-self: center;
      position: relative;
      width: 100%;
      height: auto;
      padding: 100px 30px;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
      margin-top: -50px;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
    }
    .great-rates * {
      margin-bottom: 35px;
    }
    .great-rates :nth-child(3) {
      display: none;
    }
    .great-rates div {
      position: relative;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
          -ms-flex-direction: column;
              flex-direction: column;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
    }
    .great-rates div h2 {
      font-size: 88px;
      font-weight: 900;
      color: var(--white-color);
    }
    .great-rates div sup {
      font-style: normal;
      font-weight: bold;
      font-size: 52px;
      line-height: 87.2%;
      position: relative;
      top: 10px;
      vertical-align: super;
    }
    .great-rates div span {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 23px;
      position: absolute;
      right: 20px;
      top: 42%;
    }
    .great-rates div p {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 23px;
      color: var(--white-color);
      background: var(--accent-color);
      border-radius: 20px 0 0 0;
      text-align: center;
      padding: 2px 5px;
      margin-top: -15px;
    }
    .patterned-section-intro {
      -webkit-box-ordinal-group: 3;
          -ms-flex-order: 2;
              order: 2;
      padding: 20px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: reverse;
          -ms-flex-direction: column-reverse;
              flex-direction: column-reverse;
      margin-top: -150px;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
    }
    .patterned-section-intro img {
      width: 90%;
    }
    .testimonial-wrapper {
      -webkit-box-ordinal-group: 4;
          -ms-flex-order: 3;
              order: 3;
      padding: 30px;
    }
    .testimonial-wrapper .testimonial img {
      right: 0px;
    }
  }

  /* ///////// 4g. FAQ Section //////// */
  /* Headings */
  .faq-section {
    background: var(--white-color);
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: (minmax(300px, 1fr))[auto-fit];
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    -ms-grid-rows: auto;
        grid-template-rows: auto;
    grid-auto-rows: auto;
    grid-gap: 50px;
    margin-top: 40%;
    z-index: -1;
    padding: 0 10%;
  }

  .faq-section * {
    z-index: 2;
  }

  .faq-section .patterned-section-intro {
    top: 0;
    padding: 0 10%;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .faq-section .patterned-section-intro * {
    margin-top: 0;
  }

  .faq-section .patterned-section-intro img {
    margin-top: 70px;
  }

  .faq-section > div:first-of-type {
    padding: 0 5% 0 20%;
  }

  .faq-wrapper {
    position: relative;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: .1fr 1fr;
        grid-template-columns: .1fr 1fr;
    -ms-grid-rows: auto auto;
        grid-template-rows: auto auto;
        grid-template-areas: "faq-toggle faq-toggle" "faq-content faq-content";
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    background: var(--off-white);
    padding: 10px;
    margin-bottom: 20px;
  }

  .faq-wrapper * {
    margin: 0 10px;
  }

  .faq-wrapper input {
    display: none;
  }

  .faq-wrapper input:checked + .faq-content {
    height: 100%;
    overflow: hidden;
    width: 100%;
    /* grid-area: faq-content; */
    padding: 20px;
  }

  .faq-wrapper .faq-content {
    height: 0px;
    margin: 0;
    overflow: hidden;
    width: 100%;
    -ms-grid-row: 2;
    -ms-grid-column: 1;
    -ms-grid-column-span: 2;
    grid-area: faq-content;
    font-size: 14px;
    line-height: 25px;
    color: var(--black-color);
  }

  .faq-toggle {
    -ms-grid-row: 1;
    -ms-grid-column: 1;
    -ms-grid-column-span: 2;
    grid-area: faq-toggle;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    color: var(--black-color);
    padding: 5px;
  }

  .faq-toggle span {
    color: var(--accent-color);
  }

  @media screen and (max-width: 1023px) {
    .faq-section {
      padding: 0;
      grid-gap: 0;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
    }
    .faq-section .patterned-section-intro {
      margin-top: 50vh;
      -webkit-box-ordinal-group: 2;
          -ms-flex-order: 1;
              order: 1;
    }
    .faq-section > div:first-of-type {
      -webkit-box-ordinal-group: 3;
          -ms-flex-order: 2;
              order: 2;
      padding: 20px;
    }
  }

  /* ///////// 4h. PreFoot //////// */
  /* Headings */
  .pre-footer {
    padding: 0 10%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin-bottom: 10%;
  }

  .pre-footer .separator {
    width: 90%;
    position: relative;
    top: 0;
    bottom: 0;
    margin: 10% auto;
    background-color: var(--off-white);
    height: 5px;
  }

  .pre-footer :not(.separator) {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }

  .pre-footer :not(.separator) h3 {
    margin-bottom: 40px;
    text-align: center;
  }

  .pre-footer :not(.separator) .get-started {
    width: 60%;
  }

  .pre-footer :not(.separator) .get-started input {
    background: var(--off-white);
  }

  @media screen and (max-width: 1023px) {
    .pre-footer {
      padding: 20px;
    }
    .pre-footer :not(.separator) .get-started {
      width: 100%;
    }
  }

  /* ///////// 4i. Footer //////// */
  /* Headings */
  footer {
    position: relative;
    background: var(--nero-black);
    padding: 5% 20px;
    display: -ms-grid !important;
    display: grid !important;
    -ms-grid-columns: (minmax(300px, 1fr))[auto-fit];
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    -ms-grid-rows: auto;
    grid-template-rows: auto;
  }

  footer * {
    z-index: 1;
  }

  footer .footer-widget:last-child {
    text-align: right;
  }

  .footer-widget {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    padding: 20px;
    /* margin: 20px; */
    color: var(--footer-text-color);
    font-size: 14px;
    line-height: 25px;
    width: 70%;
    justify-content: center;
  }

  .footer-widget .fas {
    color: var(--white-color);
    font-size: 22px;
    margin-bottom: 10px;
  }

  .footer-widget .footer-divider {
    height: 1px;
    margin: 30px 0;
    width: 65%;
    background: var(--footer-text-color);
  }

  .footer-widget h3 {
    color: var(--off-white);
    text-align: left;
    /* padding-left: 24px; */
  }

  .footer-widget ul {
    list-style: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    margin-top: 20px;
  }

  .footer-widget li {
    padding: 20px 0;
    display: flex;
    justify-content: start;
  }

  .footer-widget a {
    color: var(--footer-text-color);
    text-decoration: none;
    -webkit-transition: color 490ms ease-in-out;
    transition: color 490ms ease-in-out;
  }

  .footer-widget a:hover {
    color: var(--off-white);
  }

  .footer-widget a .fab {
    font-size: 25px;
  }

  .site-tagline {
    font-size: 14px;
    color: var(--off-white);
  }

  .copyright {
    display: block;
    margin-top: 30px;
  }

  @media screen and (max-width: 960px) {
    .footer-widget:nth-child(3) h3 {
      padding-left: 0px;
    }
    
    .footer-widget:nth-child(3) ul {
      padding-left: 0px;
    }
  }

  @media screen and (max-width: 600px) {
    .footer-widget h3 {
      padding-left: 0px;
    }

    .footer-widget ul {
      padding-left: 0px !important;
    }
  }


  @media screen and (max-width: 320px) {
    footer {
      justify-items: center;
      text-align: center;
      padding: 10% 0;
    }
    footer .footer-widget:last-child {
      text-align: center;
    }
    footer .logo {
      margin: 0 auto;
    }
    footer .footer-divider {
      -ms-flex-item-align: center;
          -ms-grid-row-align: center;
          align-self: center;
    }
  }

  /* ///////// 5. Components //////// */
  /* Headings */
  .section-heading {
    font-size: 50px;
    font-weight: 900;
    line-height: 125.2%;
    color: var(--black-color);
  }

  .application-flow .section-heading {
    font-size: 1.5rem;
  }

  .section-heading.light {
    color: var(--pale-navy-blue);
    width: 90%;
  }

  .footer-pattern {
    position: absolute;
    width: 524px;
    height: 783px;
    right: 0;
    bottom: 0;
    background: var(--raisin-black);
    border-radius: 500px 0px 0px 0px;
    z-index: 0;
  }

  /* ////////////////////////////////////////
  //////////// 6. Get Started - Page ///////////
  //////////////////////////////////////// */
  /* Page Layout */
  .get-started-wrapper {
    height: 100vh;
    width: 100vw;
    display: -ms-grid;
    display: grid;
    -ms-grid-rows: 60px 1fr;
        grid-template-rows: 60px 1fr;
    -ms-grid-columns: 1fr;
        grid-template-columns: 1fr;
  }

  /* Mortgage Options */
  .select-mortgage-wrapper {
    position: relative;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: (minmax(300px, 1fr))[auto-fit];
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    -ms-grid-rows: 100%;
        grid-template-rows: 100%;
  }

  /* Floating Page notice */
  .mortgage-select-notice {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    /* height: 52px */
    width: 25%;
    min-width: 280px;
    margin: 0 auto;
    background: var(--accent-color);
    border-radius: 0 0 50px 50px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
  }

  .mortgage-select-notice p {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.04em;
    text-transform: capitalize;
    color: var(--white-color);
    text-align: center;
    padding: 15px;
  }

  /* Mortgage Option Links */
  .select-mortgage-link {
    text-decoration: none;
    height: 100%;
  }

  .select-mortgage-link > * {
    display: -ms-grid;
    display: grid;
    -ms-grid-rows: auto auto auto auto auto;
        grid-template-rows: auto auto auto auto auto;
    -ms-grid-columns: .5fr 1fr 1fr .5fr;
        grid-template-columns: .5fr 1fr 1fr .5fr;
    color: var(--pale-navy-blue);
    height: 100%;
  }

  .select-mortgage-link > * * :not(.loan-title):not(.fas) {
    opacity: 0;
    -webkit-transition: opacity .5s ease-in-out;
    transition: opacity .5s ease-in-out;
  }

  .select-mortgage-link > *:hover * :not(.loan-title):not(.fas) {
    opacity: 1;
  }

  .select-mortgage-link > * .fas {
    font-size: 70px;
  }

  /* Home Loans */
  .select-home-loan {
    background: var(--primary-color);
  }

  /* NHF Loans */
  .select-nhf-loan {
    background: var(--dark-blue);
  }

  .select-nhf-loan .select-loan-rate p {
    background: var(--primary-color);
  }

  .select-nhf-loan .select-lender-wrapper {
    background: var(--primary-color);
  }

  .loan-title {
    font-style: normal;
    font-weight: 900;
    font-size: 70px;
    line-height: 108.7%;
    margin-bottom: 30px;
  }

  .select-arrow {
    -ms-grid-row: 2;
    -ms-grid-row-span: 1;
    -ms-grid-column: 2;
    -ms-grid-column-span: 1;
    grid-area: 2 / 2 / 3 / 3;
    -ms-flex-item-align: center;
        -ms-grid-row-align: center;
        align-self: center;
  }

  .select-loan-rate {
    -ms-grid-row: 3;
    -ms-grid-row-span: 1;
    -ms-grid-column: 3;
    -ms-grid-column-span: 1;
    grid-area: 3 / 3 / 4 / 4;
    justify-self: end;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: flex-start;
  }

  .select-loan-rate h2 {
    font-size: 88px;
    font-weight: 900;
    /* color: var(--white-color) */
    position: relative;
  }

  .select-loan-rate sup {
    font-style: normal;
    font-weight: bold;
    font-size: 52px;
    line-height: 87.2%;
    position: relative;
    top: 10px;
    right: -5px;
    vertical-align: super;
  }

  .select-loan-rate span {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 23px;
    position: absolute;
    right: -10px;
    top: 65%;
  }

  .select-loan-rate p {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 23px;
    color: var(--white-color);
    background: var(--dark-blue);
    border-radius: 20px 0 0 0;
    text-align: center;
    padding: 2px 5px;
  }

  .select-lender-wrapper {
    -ms-grid-row: 4;
    -ms-grid-row-span: 1;
    -ms-grid-column: 2;
    -ms-grid-column-span: 2;
    grid-area: 4 / 2 / 5 / 4;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: (minmax(120px, 1fr))[auto-fit];
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    -ms-grid-rows: auto;
        grid-template-rows: auto;
    grid-gap: 10px;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    justify-items: center;
    background: var(--dark-blue);
    border-radius: 10px;
    padding: 30px;
  }

  .select-loan-title-wrapper {
    -ms-grid-row: 3;
    -ms-grid-row-span: 1;
    -ms-grid-column: 2;
    -ms-grid-column-span: 1;
    grid-area: 3 / 2 / 4 / 3;
  }

  .select-loan-title-wrapper p {
    line-height: 25px;
  }

  .select-lender-logo {
    width: 120px;
    /* mix-blend-mode: soft-light */
  }

  @media (max-width: 480px) {
    .select-mortgage-wrapper {
      position: relative;
      display: -ms-grid;
      display: grid;
      -ms-grid-columns: (minmax(300px, 1fr))[auto-fit];
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      -ms-grid-rows: 100%;
          grid-template-rows: 100%;
    }
    .mortgage-select-notice {
      position: fixed;
      top: 60px;
    }
    .select-mortgage-link > * {
      display: -ms-grid;
      display: grid;
      -ms-grid-rows: auto auto auto auto auto auto;
          grid-template-rows: auto auto auto auto auto auto;
      -ms-grid-columns: 1fr;
          grid-template-columns: 1fr;
      grid-row-gap: 35px;
      color: var(--pale-navy-blue);
      height: 100%;
      padding: 30px;
          grid-template-areas: "." "select-arrow" "loan-title" "lender-wrap" "loan-rate" ".";
      overflow: hidden;
    }
    .select-mortgage-link > * * :not(.loan-title):not(.fas) {
      opacity: 1;
      -webkit-transition: opacity .5s ease-in-out;
      transition: opacity .5s ease-in-out;
    }
    .select-mortgage-link > * .select-arrow {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      grid-area: select-arrow;
    }
    .select-mortgage-link > * .select-loan-title-wrapper {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      grid-area: loan-title;
    }
    .select-mortgage-link > * .select-lender-wrapper {
      -ms-grid-row: 4;
      -ms-grid-column: 1;
      grid-area: lender-wrap;
      /* position: relative */
      margin: 0px -30px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      overflow: scroll;
      border-radius: 0;
    }
    .select-mortgage-link > * .select-lender-wrapper * {
      padding: 0 20px 0 0;
      margin: 10px;
    }
    .select-mortgage-link > * .select-loan-rate {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      grid-area: loan-rate;
      -ms-grid-column-align: start;
          justify-self: start;
    }

    .fiplus-step {
      flex-direction: column;
      align-items: center;
    }

    .fiplus-step :nth-child(2) {
      width: 100% !important;
      text-align: center;
    }

    .faq-section .patterned-section-intro * {
      margin-top: 200px;
    }
  }

  /* ////////////////////////////////////////
  //////////// 7. Select Lender - Page ///////////
  //////////////////////////////////////// */
  /* Page Layout */
  .preferred-lender-page-wrapper {
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr;
        grid-template-columns: 1fr;
    -ms-grid-rows: 60px 1fr;
        grid-template-rows: 60px 1fr;
    height: 100vh;
    width: 100vw;
  }

  .preferred-lender-content-wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    padding: 0 10%;
  }

  .preferred-lender-content-wrapper .section-heading {
    Width: 50%;
    text-align: center;
  }

  .available-lender-list {
    width: 50%;
    margin-top: 10%;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: (minmax(180px, 1fr))[auto-fit];
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    grid-auto-rows: 100px;
    grid-gap: 40px;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    justify-items: center;
  }

  .available-lender-list .select-lender-logo {
    width: 170px;
    -webkit-filter: grayscale(100%);
            filter: grayscale(100%);
    -webkit-transition: .3s ease-in-out;
    transition: .3s ease-in-out;
    cursor: pointer;
  }

  .available-lender-list .select-lender-logo:hover {
    -webkit-filter: grayscale(0);
            filter: grayscale(0);
  }

  @media screen and (max-width: 480px) {
    .preferred-lender-content-wrapper {
      padding: 20px;
    }
    .preferred-lender-content-wrapper .section-heading {
      width: 100%;
      margin-top: 20%;
    }
    .available-lender-list {
      width: 100%;
      margin: 20% 0;
      grid-gap: 25px;
    }
    .available-lender-list .select-lender-logo {
      width: 135px;
    }
  }

  /* ////////////////////////////////////////
  //////////// 8. Application - Page ///////////
  //////////////////////////////////////// */
  /* Page Layout */
  .application-page-wrapper {
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr;
        grid-template-columns: 1fr;
    -ms-grid-rows: 60px 1fr;
        grid-template-rows: 60px 1fr;
    height: 100vh;
    width: 100vw;
  }

  .application-flow {
    display: -ms-grid;
    display: grid;
    height: calc(100vh - 60px);
    width: 100vw;
    overflow: hidden;
    -ms-grid-rows: 60px 1fr;
        grid-template-rows: 60px 1fr;
    -ms-grid-columns: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
    padding: 0 3%;
  }

  .application-progress-wrapper {
    -ms-flex-item-align: center;
        align-self: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-flow: row nowrap;
            flex-flow: row nowrap;
    -webkit-box-align: stretch;
        -ms-flex-align: stretch;
            align-items: stretch;
  }

  .application-progress-wrapper > * {
    -webkit-box-flex: 1;
        -ms-flex: 1 1;
            flex: 1 1;
    color: var(--black-color);
  }

  .application-progress-wrapper > *:nth-child(1) {
    font-weight: 900;
  }

  .application-progress-wrapper > *:nth-child(1) .progress-bar {
    background: var(--accent-color);
  }

  .application-progress-wrapper > *:nth-child(2) .progress-bar {
    background: var(--black-color);
    opacity: .2;
  }

  .application-progress-wrapper > *:nth-child(3) .progress-bar {
    background: var(--black-color);
    opacity: .1;
  }

  .mortgage-flow-page {
    -ms-grid-column: 1;
        grid-column-start: 1;
    -ms-grid-row: 2;
        grid-row-start: 2;
    -ms-grid-column-span: 3;
        grid-column-end: span 3;
    overflow: hidden;
  }

  .mortgage-flow-page .mobile-toggle,
  .mortgage-flow-page .mobile-toggle-trigger {
    display: none;
  }

  input[class="mortgage-flow-toggle"] {
    display: none;
  }

  .mortgage-flow-nav {
    -webkit-user-select: none;
      -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
    color: var(--black-color);
    opacity: .8;
    border-bottom: 4px solid var(--off-white);
    -webkit-transition: color 0.7s, padding 0.2s, opacity 0.7s;
    transition: color 0.7s, padding 0.2s, opacity 0.7s;
    padding-left: 3%;
  }

  input[class="mortgage-flow-toggle"]:checked + .mortgage-flow-page + .mortgage-flow-nav {
    color: var(--accent-color);
    opacity: 1;
    padding-left: 20px;
    border-bottom: 4px solid var(--accent-color);
    font-weight: 900;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page {
    -webkit-transition: -webkit-transform 0.01s;
    transition: -webkit-transform 0.01s;
    transition: transform 0.01s;
    transition: transform 0.01s, -webkit-transform 0.01s;
    -webkit-transform: translateX(110%);
            transform: translateX(110%);
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page * {
    opacity: 0;
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
    -webkit-transition: opacity 0.2s, -webkit-transform 0.4s;
    transition: opacity 0.2s, -webkit-transform 0.4s;
    transition: opacity 0.2s, transform 0.4s;
    transition: opacity 0.2s, transform 0.4s, -webkit-transform 0.4s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(1) {
    -webkit-transition-delay: 0.4s;
            transition-delay: 0.4s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(2) {
    -webkit-transition-delay: 0.6s;
            transition-delay: 0.6s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(3) {
    -webkit-transition-delay: 0.8s;
            transition-delay: 0.8s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(4) {
    -webkit-transition-delay: 1s;
            transition-delay: 1s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(5) {
    -webkit-transition-delay: 1.2s;
            transition-delay: 1.2s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(6) {
    -webkit-transition-delay: 1.4s;
            transition-delay: 1.4s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(7) {
    -webkit-transition-delay: 1.6s;
            transition-delay: 1.6s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(8) {
    -webkit-transition-delay: 1.8s;
            transition-delay: 1.8s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(9) {
    -webkit-transition-delay: 2s;
            transition-delay: 2s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(10) {
    -webkit-transition-delay: 2.2s;
            transition-delay: 2.2s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(11) {
    -webkit-transition-delay: 2.4s;
            transition-delay: 2.4s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(12) {
    -webkit-transition-delay: 2.6s;
            transition-delay: 2.6s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(13) {
    -webkit-transition-delay: 2.8s;
            transition-delay: 2.8s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(14) {
    -webkit-transition-delay: 3s;
            transition-delay: 3s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(15) {
    -webkit-transition-delay: 3.2s;
            transition-delay: 3.2s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(16) {
    -webkit-transition-delay: 3.4s;
            transition-delay: 3.4s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(17) {
    -webkit-transition-delay: 3.6s;
            transition-delay: 3.6s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(18) {
    -webkit-transition-delay: 3.8s;
            transition-delay: 3.8s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(19) {
    -webkit-transition-delay: 4s;
            transition-delay: 4s;
  }

  input[class="mortgage-flow-toggle"] + .mortgage-flow-page *:nth-child(20) {
    -webkit-transition-delay: 4.2s;
            transition-delay: 4.2s;
  }

  input[class="mortgage-flow-toggle"]:checked + .mortgage-flow-page {
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
  }

  input[class="mortgage-flow-toggle"]:checked + .mortgage-flow-page * {
    opacity: 1;
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
  }

  .affordability-page-content {
    /* width: 100% */
    margin: 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-flow: row wrap;
            flex-flow: row wrap;
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
    -webkit-transition: opacity 0.2s, -webkit-transform 0.2s;
    transition: opacity 0.2s, -webkit-transform 0.2s;
    transition: opacity 0.2s, transform 0.2s;
    transition: opacity 0.2s, transform 0.2s, -webkit-transform 0.2s;
    background: var(--white-color);
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .affordability-page-content > * {
    -webkit-box-flex: 0.6;
        -ms-flex: 0.6 0.6;
            flex: 0.6 0.6;
    padding: 20px;
  }

  .affordability-summary-section {
    padding: 3% 20px;
      position: sticky;
      position: -webkit-sticky;
      position: -moz-sticky;
      position: -ms-sticky;
      position: -o-sticky;
      top: 0 !important;
      z-index: 1000 !important;
      background: var(--primary-background-color) !important;
  }

  @media print {
    button,
    .no-print,
    .mortgage-flow-nav,
    .affordability-summary-section,
    .affordability-summary-section * {
      display: none !important;
    }

    * {
      overflow-y: auto;
    }
  }

  .affordability-summary-section .section-heading {
    font-size: 40px;
  }

  .affordability-form-section {
    -webkit-box-flex: 2;
        -ms-flex: 2 2;
            flex: 2 2;
    border-left: 1px solid var(--off-white);
    border-right: 1px solid var(--off-white);
    padding: 3.5% 40px;
  }

  .affordability-form-section .section-heading {
    font-size: 25px;
  }

  .affordability-form-section h3 {
    margin-top: 0px;
    color: #ffffff;
  }

  .affordability-form-section p {
    font-size: 12px;
    margin-top: 5px;
    color: #ffffff;
  }

  .property-suggestions-section {
    -webkit-box-flex: 1;
        -ms-flex: 1 1;
            flex: 1 1;
    overflow: auto;
    padding: 4% 20px 0 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-flow: row wrap;
            flex-flow: row wrap;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    position: relative;
    flex-grow: 1 !important;
    padding-bottom: 120px !important;
  }

  .property-suggestions-section > div {
    /* background: var(--off-white); */
    /* height: 350px; */
    width: 300px;    
    background: white;
    box-shadow: 0px 0px 16px #cccccccc;
    /* margin: 10px; */
  }

  .property-suggestions-section h3 {
    color: var(--black-color);
    font-size: 17px;
    /* position: absolute; */
    /* top: 40px;
    left: 15%;
    width: 70%; */
    width: 300px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .property-suggestions-section h3 span {
    display: block;
    font-size: 13px;
    font-weight: normal;
    line-height: 18px;
    margin-top: 10px;
  }

  .application-stage {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    color: var(--black-color);
    font-style: normal;
    font-weight: 900;
    font-size: 14px;
    line-height: 18px;
    margin: 20px 0;
    padding: 20px 0;
    border-top: 1px solid var(--off-white);
    border-bottom: 1px solid var(--off-white);
  }

  .application-stage span {
    display: block;
    position: relative;
    height: 7px;
    width: 7px;
    border-radius: 100%;
    margin-right: 15px;
    background: var(--accent-color);
    text-align: center;
  }

  .application-stage span::after {
    content: '';
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0;
    left: -50%;
    height: 13px;
    width: 13px;
    background: var(--accent-color);
    opacity: .3;
    border-radius: 100%;
  }

  .application-summary-wrapper {
    margin: 20% -20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-flow: column nowrap;
            flex-flow: column nowrap;
  }

  .application-summary-wrapper > :nth-child(1) {
    background: #3B937A;
    z-index: 3;
    -webkit-box-shadow: 0px 16px 58px rgba(39, 98, 81, 0.44);
            box-shadow: 0px 16px 58px rgba(39, 98, 81, 0.44);
    position: relative;
    padding-top: 40px;
  }

  .application-summary-wrapper > :nth-child(1) > :nth-child(1) {
    position: absolute;
    top: -19%;
    background: var(--primary-color);
    padding: 10px 10%;
    color: var(--white-color);
  }

  .application-summary-wrapper > :nth-child(2) {
    background: #91D1BF;
    z-index: 2;
    -webkit-box-shadow: 0px 16px 58px rgba(39, 98, 81, 0.22);
            box-shadow: 0px 16px 58px rgba(39, 98, 81, 0.22);
  }

  .application-summary-wrapper > :nth-child(3) {
    background: var(--accent-color);
    z-index: 1;
  }

  .application-summary-wrapper > :nth-child(3) > h3::before {
    content: '-';
  }

  .application-summary-wrapper > :nth-child(3) > * {
    z-index: 10;
  }

  .application-summary-wrapper > * {
    color: #DBFFF5;
    padding: 30px;
  }

  .application-summary-wrapper p {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    z-index: 10;
  }

  .application-summary-wrapper .summary-value-wrapper h3 {
    font-size: 22px;
    line-height: 28px;
    z-index: 10;
  }

  .application-summary-wrapper .summary-value-wrapper .monetary-value::before {
    content: '₦';
    font-size: 22px;
    line-height: 28px;
    z-index: 10;
  }

  .application-stage-description {
    color: var(--black-color);
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
  }

  .progress-bar-wrapper p {
    margin-bottom: 20px;
    font-style: normal;
    font-size: 13px;
    line-height: 18px;
  }

  .progress-bar {
    height: 5px;
  }

  .eligibility-page-content {
    width: 100%;
    margin: 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-flow: row wrap;
            flex-flow: row wrap;
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
    -webkit-transition: opacity 0.2s, -webkit-transform 0.2s;
    transition: opacity 0.2s, -webkit-transform 0.2s;
    transition: opacity 0.2s, transform 0.2s;
    transition: opacity 0.2s, transform 0.2s, -webkit-transform 0.2s;
    background: var(--white-color);
  }

  .eligibility-page-content > * {
    -webkit-box-flex: 0.6;
        -ms-flex: 0.6 0.6;
            flex: 0.6 0.6;
    padding: 20px;
  }

  .eligibility-page-content .application-summary-section {
    /* background: #fafafa */
  }

  .eligibility-page-content .application-summary-section .section-heading {
    font-size: 40px;
  }

  .eligibility-page-content .eligibility-form-section {
    /* background-color: #e4e4e4 */
    -webkit-box-flex: 2;
        -ms-flex: 2 2;
            flex: 2 2;
    border-left: 1px solid var(--off-white);
    border-right: 1px solid var(--off-white);
    overflow-y: scroll;
    padding: 30px 40px;
  }

  .eligibility-page-content .eligibility-form-section .section-heading {
    font-size: 25px;
  }

  .eligibility-page-content .eligibility-form-section h3 {
    margin-top: 20px;
    color: #d4d4d4;
  }

  .eligibility-page-content .eligibility-form-section p {
    font-size: 12px;
    margin-top: 5px;
    color: #d4d4d4;
  }

  .eligibility-page-content .application-highlight-section {
    /* background-color: #fafafa */
    -webkit-box-flex: 1.5;
        -ms-flex: 1.5 1.5;
            flex: 1.5 1.5;
  }

  .mortgage-page-content {
    width: 100%;
    margin: 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-flow: row wrap;
            flex-flow: row wrap;
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
    -webkit-transition: opacity 0.2s, -webkit-transform 0.2s;
    transition: opacity 0.2s, -webkit-transform 0.2s;
    transition: opacity 0.2s, transform 0.2s;
    transition: opacity 0.2s, transform 0.2s, -webkit-transform 0.2s;
    background: var(--white-color);
  }

  .mortgage-page-content > * {
    -webkit-box-flex: 0.6;
        -ms-flex: 0.6 0.6;
            flex: 0.6 0.6;
    padding: 20px;
  }

  .mortgage-page-content .application-summary-section {
    /* background: #fafafa */
  }

  .mortgage-page-content .application-summary-section .section-heading {
    font-size: 40px;
  }

  .mortgage-page-content .application-form-section {
    /* background-color: #e4e4e4 */
    -webkit-box-flex: 2;
        -ms-flex: 2 2;
            flex: 2 2;
    border-left: 1px solid var(--off-white);
    border-right: 1px solid var(--off-white);
    overflow-y: scroll;
    padding: 30px 40px;
  }

  .mortgage-page-content .application-form-section .section-heading {
    font-size: 25px;
  }

  .mortgage-page-content .application-highlight-section {
    /* background-color: #fafafa */
    -webkit-box-flex: 1.5;
        -ms-flex: 1.5 1.5;
            flex: 1.5 1.5;
    display: none;
  }

  .form-block {
    background: var(--off-white);
    margin: 5% 0;
    width: 100%;
    padding: 40px;
    height: 500px;
  }

  .form-block h3 {
    opacity: 0.5;
    font-size: 60px;
    color: #dcdcdc;
  }

  .section-header-holder {
    padding: 20px;
    /* position: fixed */
    top: 0;
  }

  .form-content-wrapper {
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    // overflow: auto;
  }

  .property-suggestion-toggle {
    position: absolute;
    right: .1vw;
    top: 13.5px;
    z-index: 20;
    font-size: 13px;
    cursor: pointer;
    -webkit-user-select: none;
      -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    color: #ccc;
    -webkit-writing-mode: vertical-rl;
        -ms-writing-mode: tb-rl;
            writing-mode: vertical-rl;
  }

  .property-suggestion-toggle .fas {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .expand-suggestions {
    display: none;
  }

  .expand-suggestions:checked {
    z-index: 21;
  }

  .expand-suggestions:checked ~ .affordability-summary-section {
    -webkit-box-flex: 0;
        -ms-flex: 0;
            flex: 0;
  }

  .expand-suggestions:checked ~ .affordability-form-section {
    display: none;
  }

  .expand-suggestions:checked ~ .property-suggestions-section {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-flow: column wrap;
            flex-flow: column wrap;
    z-index: 10;
    -webkit-box-flex: 2.5;
        -ms-flex: 2.5 2.5;
            flex: 2.5 2.5;
  }

  .expand-suggestions:checked ~ .property-suggestions-section h3 {
    display: none;
  }

  .expand-suggestions:checked ~ .property-suggestions-section > div {
    margin-right: 32px !important;
  }

  .property-wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    overflow: auto;
  }

  .property-wrapper div {
    background: var(--off-white);
    height: 350px;
    width: 300px;
    margin: 20px 10px;
  }

  @media screen and (max-width: 770px){
    .row{
      margin-bottom: 0px;
    }
    .mt-5{
      margin-top: 0rem !important;
    }
  }

  @media screen and (max-width: 480px) {
    .application-flow {
      padding: 0;
    }
    .mobile-toggle:checked + .affordability-page-content {
      position: absolute;
      z-index: 20;
      height: 100vh;
      width: 100vw;
      padding: 0 7vw;
      color: #fff;
    }
    .mobile-toggle:checked + .affordability-page-content .affordability-form-section {
      display: none;
    }
    .mobile-toggle:checked + .affordability-page-content .affordability-summary-section {
      display: block;
    }
    .mobile-toggle:checked + .affordability-page-content .affordability-summary-section .application-summary-wrapper {
      margin-top: 10%;
      margin-bottom: 10%;
    }
    .mobile-toggle:checked + .affordability-page-content .affordability-summary-section .application-summary-wrapper > :nth-child(1) > :nth-child(1) {
      background: #fff;
      color: var(--accent-color);
      position: static;
      margin-bottom: 20px;
      margin-top: -10px;
    }
    .mobile-toggle:checked + .affordability-page-content .property-suggestions-section {
      display: block;
      padding: 0;
    }
    .mobile-toggle:checked + .affordability-page-content .property-suggestions-section > :nth-child(1) {
      position: static;
      width: 100%;
      margin-top: 10%;
      padding: 10%;
    }
    .mobile-toggle:checked + .affordability-page-content .property-suggestions-section > div:last-child {
      margin-bottom: 70%;
    }

    .mobile-toggle:checked + .affordability-page-content .property-suggestions-section > div {
      width: 100%;
    }
    .mortgage-flow-page .mobile-toggle-trigger {
      display: block;
      width: 86%;
      position: fixed;
      bottom: 10px;
      left: 0;
      right: 0;
      z-index: 30;
      padding: 15px;
      background: var(--accent-color);
      color: var(--white-color);
      margin: auto;
      text-align: center;
      cursor: pointer;
      -webkit-box-shadow: 20px 46px 30px rgba(0, 0, 0, 0.2);
              box-shadow: 20px 46px 30px rgba(0, 0, 0, 0.2);
    }
    .affordability-page-content, .eligibility-page-content, .mortgage-page-content {
      display: -ms-grid;
      display: grid;
      grid-auto-rows: 70px auto;
      grid-auto-flow: row;
      overflow: auto;
      padding-top: 30px;
    }
    .eligibility-page-content > *, .mortgage-page-content > *{
      padding: 5px;
    }
    .property-suggestion-toggle {
      display: none;
    }
    /* .property-suggestions-section {
      display: none;
    } */
    /* .affordability-summary-section {
      display: none;
    }
    .affordability-summary-section .section-heading,
    .affordability-summary-section .application-stage,
    .affordability-summary-section .application-stage-description {
      display: none;
    }
    .affordability-form-section {
      border: none;
    } */
  }
  /*# sourceMappingURL=style.css.map */

  footer.hide {
    display: none !important;
  }

  .loan-info-form .agreement-checkbox .v-input__slot {
    display: flex !important;
    align-items: flex-start !important;
  }

  .loan-info-form .agreement-checkbox .v-input__slot .v-label {
    margin-top: 0px;
    height: unset !important;
  }

  main {
    margin: 0 auto;
    max-width: 1800px;
  }

  footer a {
    color: var(--footer-text-color) !important;
  }

  footer a:hover {
    color: white !important;
  }

  @media screen and (max-width: 768px) {
    header.nav-wrapper {
      top: 0px;
    }

    .hero-headline span {
      position: relative;
      width: unset;
      display: block;
      border-left-color: transparent;
      padding-left: 0px;
      margin-left: 0px;
      margin-right: 0px;
    }

    .hero-section .hero-headline {
      font-size: 4em;
    }

    .get-started-wrapper header.nav-wrapper {
      position: fixed;
    }

    .get-started-page .row > .col {
      width: 100%;
    }

    .get-started-page .row > .col:first-of-type .select-arrow {
      margin-top: 64px;
    }

    .select-mortgage-link > * * :not(.loan-title):not(.fas) {
      opacity: 1 !important;
    }

    .why-us-section .benefit-wrapper {
      grid-gap: 70px;
      grid-auto-rows: 120px;
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

const withNewStyles = (TargetComponent) => {
  return withRouter(class extends Component {
    render() {
      const { pathname } = this.props.location;
      const pageWrapperClass = {
        '/': 'main-wrapper',
        '/get-started': 'get-started-wrapper',
        '/application': 'application-page-wrapper',
        '/application/nhf': 'application-page-wrapper',
        '/select-lender': 'select-lender-wrapper'
      }[pathname];

      return (
        <Wrapper className={pageWrapperClass}>
          <TargetComponent {...this.props} />
        </Wrapper>
      );
    }
  })
};

export default withNewStyles;