import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleChange, validateForm } from "../../utils/authFormUtils";
import signup from "../../store/middlewares/signup";
import setIsAuthenticated from "../../store/actions/setIsAuthenticated";
import setErrors from "../../store/actions/setErrors";

class RegisterPage extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    keepMeLoggedIn: true
  };

  /**
   * Handles change event on an input element
   * @param {DOMEvent} event
   */
  handleChange = event => handleChange(event, this);

  /**
   * Handles blur event on the component
   */
  handleBlur = () => this.props.setErrors([]);

  /**
   * Handles change event on an input element
   * @param {DOMEvent} event
   */
  handleSubmit = event => {
    const invalidInput = validateForm(event);
    if (invalidInput) return invalidInput.focus();
    const submitButton = event.target.querySelector('[type="submit"]');
    const data = { ...this.state };
    delete data.keepMeLoggedIn
    this.props.signup(data, submitButton, this.props.history);      
  }

  render() {
    const { errors, isLoading } = this.props;
    return (
      <div className='container-fluid px-0'>
        <section id='fp-register-page-landing'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-8 offset-md-2'>
                <div className='fp-login-auth-page-landing'>
                  <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                      <div className='fp-login-page-logo'></div>
                      <p className='fp-login-auth-page-landing-subtitle'>
                        Create an account
                      </p>
                        {
                          errors && errors.length ? (
                            <ul className="error-list">
                              {
                                errors.map((msg, index) => {
                                  return <li className="error-item" key={ index }>{ msg }</li>
                                })
                              }                    
                            </ul>
                          ) : ''
                        }
                      <form
                        className='fp-login-form-wrapper needs-validation'
                        noValidate
                        onSubmit={this.handleSubmit}
                      >
                        <div className='form-group'>
                          <label htmlFor='First Name'>First Name</label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='First Name'
                            data-state-name='firstname'
                            onChange={this.handleChange}
                            pattern='[a-zA-Z]+(?:-?[a-zA-Z])*'
                            required
                          />
                          <div className='invalid-feedback'>
                            First name must be a sequence of letters (separated
                            by hyphens or not)
                          </div>
                        </div>

                        <div className='form-group'>
                          <label htmlFor='Last Name'>Last Name</label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Last Name'
                            data-state-name='lastname'
                            onChange={this.handleChange}
                            pattern='[a-zA-Z]+(?:-?[a-zA-Z])*'
                            required
                          />
                          <div className='invalid-feedback'>
                            Last name must be a sequence of letters (separated
                            by hyphens or not)
                          </div>
                        </div>

                        <div className='form-group'>
                          <label htmlFor='Email Address'>Email Address</label>
                          <input
                            type='email'
                            className='form-control'
                            placeholder='Email Address'
                            data-state-name='email'
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
                            onChange={this.handleChange}
                            minLength='6'
                            required
                          />
                          <div className='invalid-feedback'>
                            Password must be at least 6 characters long
                          </div>
                        </div>

                        <p className='fp-terms-privacy-policy'>
                          By creating an account, you agree to Newhomes's &nbsp;
                          <a className='' href='/'>
                            Privacy Policy
                          </a>
                          &nbsp; and <a href='/'> Terms of Use</a>.
                        </p>
                        <button className='fp-modal-create-account-button' type='submit' disabled={isLoading}>
                          Create Account
                        </button>
                        <div className='fp-create-account-wrapper'>
                          Already a member?
                          <Link to='/auth/login' >
                            {" "}
                            Sign In.
                          </Link>
                        </div>
                      </form>
                    </div>
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
    signup(data, submitButton, historyObject) {
      dispatch(signup(data, submitButton, historyObject));
    },
    setIsAuthenticated(isAuthenticated) {
      dispatch(setIsAuthenticated(isAuthenticated));
    },
    setErrors(errors) {
      dispatch(setErrors(errors));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
