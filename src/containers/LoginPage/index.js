import React, { useState, useEffect } from "react";
// import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { loginUser } from './../../store/actions/authActions';

import * as Icon from "react-feather";

import "./LoginPage.css";
// import { handleChange, validateForm } from "../../utils/authFormUtils";
// import ProgressBar from "../NProgress";
// import setLoading from "../../store/actions/setLoading";
// import setErrors from "../../store/actions/setErrors";
// import login from "../../store/middlewares/login";
// import setIsAuthenticated from "../../store/actions/setIsAuthenticated";

import InputPassword from "./../../commons/InputPassword";
import TextFieldGroup from "./../../commons/TextFieldGroup";
import Header from "../../commons/Header";
import ButtonSpinner from '../ButtonSpinner';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { validations } from '../../utils/yupUtils';


// import LoginDoorIcon from "../Resource/fp-login-page-door-access.svg";


function LoginPage(props) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [backErrors, setBackErrors] = useState({});

  useEffect(()=>{
    if(props.auth.isAuthenticated){
      props.history.push("/application")
    }
  }, [props.history, props.auth.isAuthenticated]);

  useEffect(()=>{
    if(props.errors.errors){
      if(props.errors.errors.message === "login failed"){
          console.log(props.errors.errors)
          setBackErrors(props.errors.errors)
      }else if(props.errors.errors.message === "Validation Error"){
          props.errors.errors.data.map(data => (
            setBackErrors(data)
          )) 
      }
    }
  }, [props.errors]);

  // class LoginPage extends Component {
  // constructor() {
  //   super();
  //   this.submitButtonRef = createRef(null);
  //   // this.state = {
  //   //   email: "",
  //   //   password: "",
  //   //   errors: {},
  //   // };
  //   // this.handleChange = this.handleChange.bind(this);
  //   // this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // state = { email: "", password: "", keepMeLoggedIn: true };
  /**
   * Handles change event on an input element
   * @param {DOMEvent} event
   */
    //  handleChange = event => handleChange(event, this);

  // componentDidMount() {
  //   document.title = "Login Authentication | Finance Plus";
  // }
  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/application");
  //   }
  // }
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/application");
  //   }
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  /**
   * Handles change event on an input element
   * @param {DOMEvent} event
   */
  // handleSubmit = event => {
  //   const invalidInput = validateForm(event);
  //   if (invalidInput) return invalidInput.focus();
  //   const { current: submitButton } = this.submitButtonRef;
  //   const data = { ...this.state };
  //   delete data.keepMeLoggedIn;
  //   this.props.login(data, submitButton, this.props.history);
  // };

  /**
   * Handles blur event on the component
   */
  // handleBlur = () => this.setState({ errors: this.props.error });

  /**
   * Handles click event on "Join Now"
   * @param {DOMEvent} event
   */
   const handleJoinNowClick = event => {
    event.preventDefault();
  };



  // render() {
  //   const {errors, isLoading} = this.props;
  //   const backErrors = errors

    const validationSchema = (() => {
      return Yup.object().shape({
        email: validations.email,
        password: validations.password,    
      });
    })();

    return (

      <div className='container-fluid px-0'>
        <section id='fp-login-auth-page'>
        <Header />
        
          <div className='container-fluid fp-login-auth-page-landing'>
                  <div className='row'>
                    <div className='col-md-8 offset-md-2 mt-5 fp-login-auth-page-landing-form'>
                      <p className='fp-login-auth-page-landing-subtitle'>
                        Sign in
                      </p>
                      {/* <div className='fp-login-notification'>
                        <div className='fp-login-notification-content-wrapper'>
                          <div className='fp-login-notification-content'>
                            <div className='fp-login-notification-content-title'>
                              You have been signed out
                            </div>
                            <div className='fp-login-notification-content-text'>
                              Due to a period of inactivity, you have
                              automatically been signed out of FinancePlus. You
                              can sign back in below.
                            </div>
                          </div>
                        </div>
                      </div> */}
                      {backErrors && backErrors.length ? (
                        <ul className='error-list fp-errors-display-list'>
                          {backErrors.map((msg, index) => {
                            return (
                              <li className='error-item' key={index}>
                                <Icon.AlertCircle
                                  className='mr-2'
                                  size='12'
                                  color='#f00'
                                />
                                {msg}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        ""
                      )}

              <Formik
                      initialValues={{
                        email: "",
                        password: "",
                      }}
                      onSubmit={(data) => props.loginUser(data)}
                      // onSubmit={this.handleSubmit}
                      validationSchema={validationSchema}
                    >
                      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => {
                        const { 
                          email, password
                        } = values;
                        if(backErrors.success === false){
                          isSubmitting = false;
                          // backErrors.data = {}
                        }
                        // if(backErrors){
                        //   isSubmitting = false;
                        //   // backErrors.data = {}
                        // }
                        
                return (
                  <Form className="fp-login-form-wrapper" > 
                        
                        <TextFieldGroup 
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // onChange={(e)=> setEmail(e.target.value)} 
                            pattern='^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$'
                            required
                            error={errors ? errors.email : (backErrors.message === "login failed"  && backErrors.data)}
                            // error={errors ? errors.email :  backErrors.data }
                            // error= {(backErrors.message === "login failed" ? backErrors.data : errors.email )}  
                            // {...{ errors, touched }}
                            // error="Invalid email address"
                        />
                        <InputPassword 
                            type="password" 
                            placeholder="Password"
                            name='password'
                            value={password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // onChange={(e)=> setPassword(e.target.value)}
                            minLength='6'
                            error={errors ? errors.password : (backErrors.message === "login failed"  && backErrors.data)}
                            // error={errors ? errors.password : backErrors.data}
                            // error = {(backErrors.message === "login failed" ? backErrors.data : errors.password )} 
                            // {...{ errors, touched }}
                          /> 


                        <div className='fp-login-options'>
                          <div className='fp-forgotPassword'>
                            <Link className="fp-forgotPassword-link" to='/auth/resetPassword'>
                              Forgot your password? Recover it
                            </Link>
                          </div>
                        </div>
                        {/* <input type="submit" className="btn-lg btn-info btn-block mt-4 mb-4" value="Sign In"  /> */}
                        <button
                          type='submit'
                          className='btn-lg btn-info btn-block mt-4 mb-4'
                          disabled={isSubmitting}
                        >
                          {
                            isSubmitting ? (
                              <ButtonSpinner />
                            ) : 'Sign In'
                          }
                        </button>
                        <div className='fp-create-account-wrapper'>
                          Do not have an account?
                          <Link
                            className="sign"
                            to='/auth/register'
                            onClick={handleJoinNowClick}
                          >
                            {" "}
                            Sign Up
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
      </div>)
    // }
  }

LoginPage.propTypes ={
    loginUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
// const mapStateToProps = (state , ownProps) => {
//   return {
//     isAuthenticated: state.isAuthenticated,
//     // isLoading: state.isLoading,
//     errors: state.errors,
//     ...ownProps
//   };
// };

const mapStateToProps = (state)=>({
  auth: state.auth,
  errors: state.errors
});

// const mapDispatchToProps = dispatch => {
//   return {
//     setLoading(isLoading) {
//       dispatch(setLoading(isLoading));
//     },
//     setErrors(errors) {
//       dispatch(setErrors(errors));
//     },
//     login(data, submitButton, historyObject) {
//       dispatch(login(data, submitButton, historyObject));
//     },
//     setIsAuthenticated(isAuthenticated) {
//       dispatch(setIsAuthenticated(isAuthenticated));
//     }
//   };
// };

export default connect(mapStateToProps, {loginUser})(withRouter(LoginPage));
// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
