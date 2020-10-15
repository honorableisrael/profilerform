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
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-7'>
                <div className='fp-login-auth-page-landing'>
                  <div className='row'>
                    <div className='col-md-6 offset-md-3 mt-2 fp-login-auth-page-landing-form'>
                      <div className='fp-login-page-logo'></div>
                      <p className='fp-login-auth-page-landing-subtitle'>
                        Sign in to continue
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
                        <div className='form-group'>
                          <label htmlFor='Email address'>Email address</label>
                          <input
                            type='email'
                            className='form-control'
                            placeholder='Email address'
                            data-state-name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                            pattern='^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$'
                            required
                          />
                          <div className='invalid-feedback'>
                            Invalid email address
                          </div>
                        </div>
                        <div className='form-group'>
                          <label htmlFor='Password' className='mg-b-0-f'>
                            Password
                          </label>
                          <input
                            type='password'
                            className='toggled form-control'
                            placeholder='Password'
                            data-state-name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            minLength='6'
                            required
                          />
                          <div className='invalid-feedback'>
                            Password must be at least 6 characters long
                          </div>
                        </div>

                        <div className='fp-checkbox fp-keep-me-logged-in'>
                          <input
                            type='checkbox'
                            name='keepMeLoggedIn'
                            data-state-name='keepMeLoggedIn'
                          />
                          <label
                            htmlFor=' Keep me logged in'
                            className='checkbox'
                          >
                            Keep me logged in
                          </label>
                        </div>

                        <div className='fp-login-options'>
                          <div className='fp-forgotPassword'>
                            <Link to='/auth/password/reset'>
                              Forgot password?
                            </Link>
                          </div>
                        </div>
                        <p className='fp-terms-privacy-policy'>
                          By logging in, you agree to Newhomes's{" "}
                          <a className='' href='/'>
                            Privacy Policy
                          </a>{" "}
                          and <a href='/'> Terms of Use</a>.
                        </p>
                        <button className='fp-modal-login-button' disabled={isLoading}>
                          log in
                        </button>
                        <div className='fp-create-account-wrapper'>
                          Not a member?
                          <a
                            href='/auth/register'
                            onClick={this.handleSigninClick}
                          >
                            {" "}
                            Join Now.
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-5 fp-login-auth-page-sidebar'>
                <div className='fp-login-auth-page-sidebar-wrapper'>
                  <div className='fp-login-auth-page-img-wrapper'>
                    {/* <figure>
                      <img src={LoginDoorIcon} alt='/' className='img-fluid' />
                    </figure> */}
                    <h2>Welcome Back :)</h2>
                    <p>
                      To keep connected with us, please login with your
                      registered email address and password.
                    </p>
                  </div>
                  <div className='fp-login-page-sidebar-copyright'>
                    &copy; 2019 Newhomes Nigeria.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ root: state }, ownProps) => {
  return {
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    errors: state.errors,
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
