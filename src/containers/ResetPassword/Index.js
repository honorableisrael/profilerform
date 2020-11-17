import React, {useState} from 'react';
import { Link } from "react-router-dom";
import TextFieldGroup from "./../../commons/TextFieldGroup";
import InputPassword from "./../../commons/InputPassword";
import Header from "./../Header";

import { handleChange, validateForm } from "../../utils/authFormUtils";

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [codeAvailable, setCodeAvailable] = useState(false);


    const handleSubmit = event => {
        const invalidInput = validateForm(event);
        if (invalidInput) return invalidInput.focus();
        const { current: submitButton } = this.submitButtonRef;
        const data = { ...this.state };
        delete data.keepMeLoggedIn;
        this.props.login(data, submitButton, this.props.history);
      };

    //  const handleChange = event => handleChange(event, this);
    return (
        
        <div className='container-fluid px-0'>
            <section id='fp-login-auth-page'>
             <Header />
             <div className='container-fluid fp-login-auth-page-landing'>
                  <div className='row'>
                    <div className='col-md-8 offset-md-2 mt-5 fp-login-auth-page-landing-form'>
                      <p className='fp-login-auth-page-landing-subtitle'>
                        Reset Password
                      </p>
                      <form
                        className='fp-login-form-wrapper needs-validation'
                        noValidate
                        onSubmit={handleSubmit}
                      >

                        <TextFieldGroup 
                            type='email'
                            className='form-control'
                            placeholder='Email address'
                            name='email'
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)} 
                            pattern='^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$'
                            required
                            // error="Invalid email address"
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
                            // error="Invalid email address"
                        />
                         <InputPassword 
                            type="password" 
                            placeholder="Password"
                            name='password'
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            minLength='6'
                          />
                        </div>
                          :
                          null 
                        }

                        
                        {codeAvailable ? 
                            <input type="submit" className="btn-lg btn-info btn-block mt-4" value="Reset Password" disabled /> : 
                            <input type="submit" 
                                className="btn-lg btn-info btn-block mt-4" 
                                value="Get code"
                                onClick={(e)=> setCodeAvailable(true)}/>
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

export default ResetPassword
