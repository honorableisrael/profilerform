import React from 'react';
import "./landing.css";
import {Link} from "react-router-dom";
import { Container } from 'react-bootstrap';
import greypatch from '../../assets/greypatch.png';

const HeroSection = () => {

   return (
     <div>
       <section className="redesignheroSection">
         <Container>
           <div>
              <img src={greypatch} className="hero__vector homemainImage img-fluid"/>  
           </div> 
           <article className="rdheroSection__headline">
             <h1 className="redesignheroSection__headline--main">
               Profiling and Home Ownership Platform.
             </h1>
             <p>
               Discover great mortgage deals from trusted lenders across the
               country, and get expert advice on the right option for you. Best of
               all, we are absolutely free!
           </p>
        <div>
         <Link className="btn-gtstrted" to="/signin" >
            Get Started for Free
         </Link>
         </div>
        <div className="redirlnltvd">Still confused? Check our 1 min video</div>
       </article>
       </Container>
    </section>
    </div>
  );
}
 
export default HeroSection;