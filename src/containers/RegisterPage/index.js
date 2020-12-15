import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom';
import { registerUser } from './../../store/actions/authActions';
// import { handleChange, validateForm } from "../../utils/authFormUtils";
// import signup from "../../store/middlewares/signup";
// import setIsAuthenticated from "../../store/actions/setIsAuthenticated";
// import setErrors from "../../store/actions/setErrors";
import Header from "../../commons/Header";
import InputPassword from "./../../commons/InputPassword";
import TextFieldGroup from "./../../commons/TextFieldGroup";
import "./RegisterPage.css";

import ButtonSpinner from '../ButtonSpinner';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { validations } from '../../utils/yupUtils';

function RegisterPage(props) {
  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [backErrors, setBackErrors] = useState({});

  useEffect(()=>{
    if(props.auth.isAuthenticated){
      props.history.push("/auth/login")
    }
  }, [props.history, props.auth.isAuthenticated]);

  useEffect(()=>{
    if(props.errors.errors){
      if(props.errors.errors.data.message === "register failed"){
          console.log(props.errors.errors)
          setBackErrors(props.errors.errors.data)
      }else if(props.errors.errors.data.message === "Validation Error"){
          props.errors.errors.data.data.map(data => (
            setBackErrors(data)
          )) 
      }
    }
  }, [props.errors]);
  // state = {
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   password: "",
  //   phone: "",
  //   keepMeLoggedIn: true
  // };

  /**
   * Handles change event on an input element
   * @param {DOMEvent} event
   */
  // handleChange = event => handleChange(event, this);

  /**
   * Handles blur event on the component
   */
  // handleBlur = () => this.props.setErrors([]);

  /**
   * Handles change event on an input element
   * @param {DOMEvent} event
   */
  // handleSubmit = event => {
  //   const invalidInput = validateForm(event);
  //   if (invalidInput) return invalidInput.focus();
  //   const submitButton = event.target.querySelector('[type="submit"]');
  //   const data = { ...this.state };
  //   delete data.keepMeLoggedIn
  //   this.props.signup(data, submitButton, this.props.history);      
  // }

  // const handleSubmit=(e)=> {
  //   e.preventDefault();

  //   const newUser = {
  //     firstname,
  //     lastname,
  //     email,
  //     password,
  //   };

  //   props.registerUser(newUser, props.history);
  // }

  // render() {
    // const {loading} = props.errors

    const validationSchema = (() => {
      return Yup.object().shape({
        email: validations.email,
        password: validations.password, 
        firstname: validations.isRequiredSingleName,
        lastname: validations.isRequiredSingleName,
      });
    })();

    return (
      <div className='container-fluid px-0'>
        <section id='fp-login-auth-page'>
        <Header />
        <p className='fp-login-auth-page-subheading'>
                        Resgistering to this website, you accept our 
                        <span className='fp-create-account-wrapper'><Link to='/terms' > {" "}Terms of use</Link></span> and our 
                        <span className='fp-create-account-wrapper'><Link to='/privacy' > {" "}Privacy Policy</Link></span>
        </p>
        <div className='container-fluid fp-login-auth-page-landing'>
                  <div className='row'>
                    <div className='col-md-12 fp-login-auth-page-landing-form'>
                      <p className='fp-login-auth-page-landing-subtitle'>
                        Sign Up
                      </p>
                        {
                          backErrors && backErrors.length ? (
                            <ul className="error-list">
                              {
                                backErrors.map((msg, index) => {
                                  return <li className="error-item" key={ index }>{ msg }</li>
                                })
                              }                    
                            </ul>
                          ) : ''
                        }

              <Formik
                      initialValues={{
                        email: "",
                        password: "",
                        firstname: "",
                        lastname: "",
                      }}
                      onSubmit={(data) => props.registerUser(data)}
                      validationSchema={validationSchema}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => {
                        const { 
                          email, password, firstname, lastname
                        } = values;
                        if(backErrors.success === false){
                          isSubmitting = false;
                          // backErrors.data = {}
                        }
                return (
                  <Form className="fp-login-form-wrapper needs-validation" > 
                      <div className=" row">
                        <div  className='col-md-6 col-sm-12'>
                        <TextFieldGroup 
                            type='text'
                           
                            placeholder='First Name'
                            name='firstname'
                            value={firstname}
                            // onChange={(e)=> setFirstname(e.target.value)}
                            onBlur={handleBlur}
                            onChange={handleChange} 
                            pattern='[a-zA-Z]+(?:-?[a-zA-Z])*'
                            required
                            error={errors ? errors.firstname : (backErrors.message === "register failed"  && backErrors.data)}
                            // error={errors.message === "register failed" ? errors.data : errors.firstname } 
                            // error="First name must be a sequence of letters (separated
                            // by hyphens or not)"
                        />
                        </div>
                        <div  className='col-md-6 col-sm-12'>
                        <TextFieldGroup 
                            type='text'
                            placeholder='Last Name'
                            name='lastname'
                            value={lastname}
                            // onChange={(e)=> setLastname(e.target.value)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            pattern='[a-zA-Z]+(?:-?[a-zA-Z])*'
                            required
                            error={errors ? errors.lastname : (backErrors.message === "register failed"  && backErrors.data)}
                            // error={errors.message === "register failed" ? errors.data : errors.lastname }
                            // error="Last name must be a sequence of letters (separated
                            // by hyphens or not)"
                        />
                        </div>
                        </div>
                        
                        <TextFieldGroup 
                            type='email'
                            // className='form-control'
                            placeholder='Email'
                            name='email'
                            value={email}
                            // onChange={(e)=> setEmail(e.target.value)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            pattern='^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$'
                            required
                            // error={errors ? errors.email : (backErrors.message === "register failed"  && backErrors.data)}
                            error = {(backErrors.message === "register failed" ? backErrors.data : errors.password )} 
                            // error={errors.message === "register failed" ? errors.data : errors.email }
                            // error="Invalid email address"
                        />

                        <InputPassword 
                            type="password" 
                            placeholder="Password"
                            name='password'
                            value={password}
                            // onChange={(e)=> setPassword(e.target.value)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            minLength='6'
                            error={errors ? errors.password : (backErrors.message === "register failed"  && backErrors.data)}
                            // error={errors.message === "register failed" ? errors.data : errors.password }
                          /> 

                        {/* <input type="submit" className="btn-lg btn-info btn-block mt-4 mb-4" value="Sign Up" /> */}
                        <button
                          type='submit'
                          className='btn-lg btn-info btn-block mt-4 mb-4'
                          disabled={isSubmitting}
                        >
                          {
                            isSubmitting ? (
                              <ButtonSpinner />
                            ) : 'Sign Up'
                          }
                        </button>
                        <div className='fp-create-account-wrapper'>
                          Already have an Account?
                          <Link to='/auth/login' >
                            {" "}
                            Sign In.
                          </Link>
                        </div>
                        </Form>
              );
            }}
          </Formik>
                    </div>
                  </div>
                </div>

             
        </section>
      </div>
    );
  // }
}

// const mapStateToProps = ({ root: state }, ownProps) => {
//   return {
//     // isAuthenticated: state.isAuthenticated,
//     // isLoading: state.isLoading,
//     // errors: state.errors,
//     ...ownProps
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     signup(data, submitButton, historyObject) {
//       dispatch(signup(data, submitButton, historyObject));
//     },
//     setIsAuthenticated(isAuthenticated) {
//       dispatch(setIsAuthenticated(isAuthenticated));
//     },
//     setErrors(errors) {
//       dispatch(setErrors(errors));
//     }
//   };
// };

RegisterPage.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(RegisterPage));
