import React from 'react'
import "./InputPassword.css";
import classnames from "classnames";
// import PropTypes from "prop-types";

function TextFieldGroup({ info, error, type, placeholder, onChange, value, minLength, name}) {

    const passwordToogle =()=>{
        let x = document.getElementById("inputField");
        let y = document.getElementById("hide1");
        let z = document.getElementById("hide2");

        if(x.type === 'password'){
            x.type = "text";
            y.style.display = "block";
            z.style.display = "none";
            console.log(x.type)
        }else{
            x.type = "password";
            y.style.display = "none";
            z.style.display = "block";
            console.log(x.type)
        }
    }

  return (
    <div className="input-group">
              <input  
                  className={classnames("input-area",{
                    "is-invalid": error
                  })}  
                  id="inputField"
                  placeholder={""} 
                  type={type}
                  onChange={onChange}
                  name={name}
                  value={value}
                  minLength={minLength}
                  required
              />
              <label htmlFor="inputField" className="input-label">{placeholder}</label>
              <span className= "eye" onClick={passwordToogle}>
                    {type === "password" ? <i id="hide1" className="fa fa-eye"></i>: null}
                    {type === "password" ? <i id="hide2" className="fa fa-eye-slash"></i>: null}
              </span>
              {info && <small className= "form-text text-muted">{info}</small>}
              {error && (<div className="invalid-feedback">{error}</div>)}
              {/* <div className='invalid-feedback'>
                            Password must be at least 6 characters long
              </div> */}
    </div>
  )
}

// TextFieldGroup.propTypes ={
//   name: PropTypes.string.isRequired,
//   placeholder: PropTypes.string,
//   value: PropTypes.string.isRequired,
//   info: PropTypes.string,
//   error: PropTypes.string,
//   type: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   disabled: PropTypes.string
// }

// TextFieldGroup.defaultProps ={
//   type: 'text'
// }

export default TextFieldGroup