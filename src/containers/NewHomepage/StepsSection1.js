import React from 'react'
import {Link} from "react-router-dom";

function StepsSection1() {
    return (
        <div className="stepSession1">
            <div className="stepSession1__heading">
                <h1>How it works</h1>
                <p>Get on the Property ladder in 3 simple steps</p>
            </div>
            <div className="stepSession1__main">
                <div className="stepSession1__steps">
                    <div className="stepSession1__steps--item step1">
                        <span>1</span>
                        <h2>Register your profile</h2>
                        <div></div>
                        <h4>Your journey to home ownership begins with the affordability test.</h4>
                        <p> Select your preferred mortgage type, answer a few questions, and our 
                            unique algorithm will let you know the maximum loan you can afford.</p>
                    </div>
                    <div className="stepSession1__steps--item step2">
                        <span>2</span>
                        <h2>Check Affordability</h2>
                        <div></div>
                        <h4>Using the personal and financial information you provide us,</h4>
                        <p>  We will check your credit information against lenders' criteria to
                            make sure you’re eligible to apply for a home loan, and give you your best chance for approval.</p>
                    </div>
                    <div className="stepSession1__steps--item step3">
                        <span>3</span>
                        <h2>Request for a Property</h2>
                        <div></div>
                        <h4>You are well on your way to owning your home!</h4>
                        <p>  Complete your mortgage application online in minutes; Get reports, monitor and track your 
                            application progress every step of the way! See application requirements.</p>
                    </div>
                </div>
                <Link className="btn btn-info stepSession1__btn" to="/auth/register" >
                Get Started for Free
                </Link>
            </div>
        </div>
    )
}

export default StepsSection1
