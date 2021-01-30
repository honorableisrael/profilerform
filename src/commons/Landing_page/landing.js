import React from 'react';
import HomeNav from '../HomeNavbar/HomeNav';
import Herosection from './redeherosection';
import RedsgnStepSection from './redesignstep_section';
import VideoSection from './redesignvideosection';
import FooterSection from './redesignFooter';
import PatnersSection from './redesignPartnersection';

const Landing_page = ()=>{
    return(
        <div>
            <HomeNav/>
            <Herosection/>
            <PatnersSection/>
            <RedsgnStepSection/>
            <VideoSection/>
            <FooterSection/>
        </div>
    )
}
export default Landing_page;