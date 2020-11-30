import React, {useState, useEffect} from 'react';
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../../commons/TextFieldGroup";
import InputPassword from "../../commons/InputPassword";
import Header from "../../commons/Header";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {forgotPassword, resetPassword} from "./../../store/actions/authActions";

function ResetPassword(props) {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [codeAvailable, setCodeAvailable] = useState(false);
    const [errors, setErrors] = useState({});
    // const [errors2, setErrors2] = useState({});

    
  
    useEffect(()=>{
      if(props.errors.errors){
        if(props.errors.errors.data.message === "failed"){
              setErrors(props.errors.errors.data)
        }else if(props.errors.errors.data.message === "Validation Error"){
            props.errors.errors.data.data.map(data => (
              setErrors(data)
            )) 
        }
      }
    }, [props.errors]);

    useEffect(()=>{
      if(props.auth.user.success){
        setCodeAvailable(true)
      }
    }, [props.auth])

    useEffect(()=>{
      if(props.auth.user.message === "password changed successfully"){
        props.history.push("/auth/login")
      }
    }, [props.history, props.auth]);

    // useEffect(()=>{
    //   if(props.errors.errors){
    //     if(props.errors.errors.data.message === "failed"){
    //         // console.log(props.errors)
    //         setErrors2(props.errors.errors) 
    //     }else if(props.errors.errors.message === "Validation Error"){
    //         props.errors.errors.data.map(data => (
    //           setErrors2(data)
    //         )) 
    //     }
    //   }
    // }, [props.errors]);


    const sendPasswordResetMail = (e)=>{
      e.preventDefault(); 

      const userData = {
        email,
      };
      props.forgotPassword(userData);
      
    }

    const handleSubmit = (e)=>{
      e.preventDefault(); 

      const userData = {
        email, code, password
      };
      props.resetPassword(userData);
    }
    return (
        
        <div className='container-fluid px-0'>
            <section id='fp-login-auth-page'>
             <Header />
             <div className='container-fluid fp-login-auth-page-landing'>
                  <div className='row'>
                    <div className='col-md-12 fp-login-auth-page-landing-form'>
                      <p className='fp-login-auth-page-landing-subtitle'>
                        Reset Password
                      </p>
                      <form
                        className='fp-login-form-wrapper needs-validation'
                        noValidate
                        onSubmit={handleSubmit}
                      >
                        {codeAvailable ? (
                        <p>
                          If that account is in our system, we emailed you a code to reset
                          your password.
                        </p>    
                        ) : (
                        <p>
                          It happens to the best of us. Enter your email and we'll send you
                          reset instructions.
                        </p>
                        )}
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
                        {codeAvailable ?
                        <div>
                        <TextFieldGroup 
                            type='number'
                            className='mg-b-0-f'
                            placeholder='Enter code'
                            name='code'
                            value={code}
                            onChange={(e)=> setCode(e.target.value)} 
                            pattern='^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$'
                            required
                            error={errors.message === "failed" ? errors.data : errors.code }
                        />
                         <InputPassword 
                            type="password" 
                            placeholder="New Password"
                            name='password'
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            minLength='6'
                            error={errors.message === "failed" ? errors.data : errors.password }
                          />
                        </div>
                          :
                          null 
                        }

                        
                        {codeAvailable ? 
                            <input type="submit" className="btn-lg btn-info btn-block mt-4" value="Reset Password" /> : 
                            <input type="submit" 
                                className="btn-lg btn-info btn-block mt-4" 
                                value="Send password reset email"
                                onClick={sendPasswordResetMail}/>
                        }   
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

ResetPassword.propTypes ={
  forgotPassword : PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>({
errors: state.errors,
auth: state.auth
});



export default connect(mapStateToProps, {forgotPassword, resetPassword})(withRouter(ResetPassword));
