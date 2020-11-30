import React, {useState, useEffect} from 'react';
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../../commons/TextFieldGroup";
// import InputPassword from "../../commons/InputPassword";
import Header from "../../commons/Header";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {forgotPassword } from "./../../store/actions/authActions";

function ForgotPassword(props) {
    const [email, setEmail] = useState("");
    // const [code, setCode] = useState("");
    // const [newPassword, setNewPassword] = useState("");
    // const [codeAvailable, setCodeAvailable] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(()=>{
      if(props.auth.isAuthenticated){
        props.history.push("/auth/resetPassword")
      }
    }, [props.history, props.auth.isAuthenticated]);
  
    useEffect(()=>{
      if(props.errors.errors){
        if(props.errors.message === "failed"){
            // console.log(props.errors)
            setErrors(props.errors)
        }else if(props.errors.errors.message === "Validation Error"){
            props.errors.errors.data.map(data => (
              setErrors(data)
            )) 
        }
      }
    }, [props.errors]);


    const sendPasswordResetMail = (e)=>{
      e.preventDefault(); 

    const userData = {
      email,
    };
    props.forgotPassword(userData);
    }

    return (
        
        <div className='container-fluid px-0'>
            <section id='fp-login-auth-page'>
             <Header />
             <div className='container-fluid fp-login-auth-page-landing'>
                  <div className='row'>
                    <div className='col-md-12 fp-login-auth-page-landing-form'>
                      <p className='fp-login-auth-page-landing-subtitle'>
                        Forgot Password
                      </p>
                      <form
                        className='fp-login-form-wrapper needs-validation'
                        noValidate
                        onSubmit={sendPasswordResetMail}
                      >
                        <p>
                          It happens to the best of us. Enter your email and we'll send you
                          reset instructions.
                        </p>
                        
                        <TextFieldGroup 
                            type='email'
                            className='form-control'
                            placeholder='Email address'
                            name='email'
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)} 
                            pattern='^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$'
                            required
                            error={errors.message === "failed" ? errors.data : errors.email }
                        />

                        <input type="submit" 
                                className="btn-lg btn-info btn-block mt-4" 
                                value="Send password reset email"
                                // onClick={sendPasswordResetMail}
                        />
                           
                        <div className='fp-create-account-wrapper'>
                            <Link to='/auth/login' className="link" >Already a member?{" "}</Link> 
                            <span>Reset</span>  
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
        </section>
      </div>
    )
}

ForgotPassword.propTypes ={
  forgotPassword : PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>({
errors: state.errors,
auth: state.auth
});



export default connect(mapStateToProps, {forgotPassword})(withRouter(ForgotPassword));
