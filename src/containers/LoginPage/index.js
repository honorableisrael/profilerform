import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as Icon from "react-feather";

import "./LoginPage.css";
import { handleChange, validateForm } from "../../utils/authFormUtils";
import ProgressBar from "../NProgress";
import setLoading from "../../store/actions/setLoading";
import setErrors from "../../store/actions/setErrors";
import login from "../../store/middlewares/login";
import setIsAuthenticated from "../../store/actions/setIsAuthenticated";
import InputPassword from "./../../commons/InputPassword";
import TextFieldGroup from "./../../commons/TextFieldGroup";
import Header from "../../commons/Header";

// import LoginDoorIcon from "../Resource/fp-login-page-door-access.svg";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.submitButtonRef = createRef(null);
  }

  state = { email: "", password: "", keepMeLoggedIn: true };
  /**
   * Handles change event on an input element
   * @param {DOMEvent} event
   */
  handleChange = event => handleChange(event, this);

  componentDidMount() {
    document.title = "Login Authentication | Finance Plus";
  }

  /**
   * Handles change event on an input element
   * @param {DOMEvent} event
   */
  handleSubmit = event => {
    const invalidInput = validateForm(event);
    if (invalidInput) return invalidInput.focus();
    const { current: submitButton } = this.submitButtonRef;
    const data = { ...this.state };
    delete data.keepMeLoggedIn;
    this.props.login(data, submitButton, this.props.history);
  };

  /**
   * Handles blur event on the component
   */
  handleBlur = () => this.props.setErrors([]);

  /**
   * Handles click event on "Join Now"
   * @param {DOMEvent} event
   */
  handleJoinNowClick = event => {
    event.preventDefault();
  };


  render() {
    const { errors, isLoading } = this.props;
    return (

      <div className='container-fluid px-0'>
        <ProgressBar isLoading={isLoading} />
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
                      {errors && errors.length ? (
                        <ul className='error-list fp-errors-display-list'>
                          {errors.map((msg, index) => {
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

                      <form
                        className='fp-login-form-wrapper'
                        noValidate
                        onBlur={this.handleBlur}
                        onSubmit={this.handleSubmit}
                      > 
                        <TextFieldGroup 
                            type='email'
                            // className='form-control'
                            placeholder='Email'
                            name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                            pattern='^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$'
                            required
                            // error="Invalid email address"
                        />
                        <InputPassword 
                            type="password" 
                            placeholder="Password"
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            minLength='6'
                          /> 


                        <div className='fp-login-options'>
                          <div className='fp-forgotPassword'>
                            <Link className="fp-forgotPassword-link" to='/auth/password/reset'>
                              Forgot your password? Recover it
                            </Link>
                          </div>
                        </div>
                        <input type="submit" className="btn-lg btn-info btn-block mt-4 mb-4" value="Sign In" disabled={isLoading} />
                        <div className='fp-create-account-wrapper'>
                          Do not have an account?
                          <Link
                            className="sign"
                            to='/auth/register'
                            onClick={this.handleSigninClick}
                          >
                            {" "}
                            Sign Up
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
        </section>
      </div>)
    };
  };

const mapStateToProps = ({ root: state }, ownProps) => {
  return {
    // isAuthenticated: state.isAuthenticated,
    // isLoading: state.isLoading,
    // errors: state.errors,
    ...ownProps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading(isLoading) {
      dispatch(setLoading(isLoading));
    },
    setErrors(errors) {
      dispatch(setErrors(errors));
    },
    login(data, submitButton, historyObject) {
      dispatch(login(data, submitButton, historyObject));
    },
    setIsAuthenticated(isAuthenticated) {
      dispatch(setIsAuthenticated(isAuthenticated));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
