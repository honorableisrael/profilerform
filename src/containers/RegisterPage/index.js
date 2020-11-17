import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleChange, validateForm } from "../../utils/authFormUtils";
import signup from "../../store/middlewares/signup";
import setIsAuthenticated from "../../store/actions/setIsAuthenticated";
import setErrors from "../../store/actions/setErrors";
import Header from "./../Header";
import InputPassword from "./../../commons/InputPassword";
import TextFieldGroup from "./../../commons/TextFieldGroup";

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
        <section id='fp-login-auth-page'>
        <Header />
        <p className='fp-login-auth-page-subheading'>
                        Resgistering to this website, you accept our 
                        <span className='fp-create-account-wrapper'><Link to='/terms' > {" "}Terms of use</Link></span> and our 
                        <span className='fp-create-account-wrapper'><Link to='/privacy' > {" "}Privacy Policy</Link></span>
        </p>

        <div className='container-fluid fp-login-auth-page-landing'>
                  <div className='row'>
                    <div className='col-md-8 offset-md-2 mt-5 fp-login-auth-page-landing-form'>
                      <p className='fp-login-auth-page-landing-subtitle'>
                        Sign Up
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
                        <TextFieldGroup 
                            type='text'
                            // className='form-control'
                            placeholder='First Name'
                            name='firstname'
                            value={this.state.firstname}
                            onChange={this.handleChange}
                            pattern='[a-zA-Z]+(?:-?[a-zA-Z])*'
                            required
                            // error="First name must be a sequence of letters (separated
                            // by hyphens or not)"
                        />
                        <TextFieldGroup 
                            type='text'
                            // className='form-control'
                            placeholder='Last Name'
                            name='lastname'
                            value={this.state.lastname}
                            onChange={this.handleChange}
                            pattern='[a-zA-Z]+(?:-?[a-zA-Z])*'
                            required
                            // error="Last name must be a sequence of letters (separated
                            // by hyphens or not)"
                        />
                        
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

                        <input type="submit" className="btn-lg btn-info btn-block mt-4 mb-4" value="Sign Up" disabled={isLoading} />
                        <div className='fp-create-account-wrapper'>
                          Already have an Account?
                          <Link to='/auth/login' >
                            {" "}
                            Sign In.
                          </Link>
                        </div>
                      </form>
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
    // isAuthenticated: state.isAuthenticated,
    // isLoading: state.isLoading,
    // errors: state.errors,
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
