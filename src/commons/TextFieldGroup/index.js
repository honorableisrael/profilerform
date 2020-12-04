import React from 'react'
import "./TextFieldGroup.css";
import classnames from "classnames";
// import PropTypes from "prop-types";

function TextFieldGroup({
  name, 
  placeholder,
  value,
  type,
  onChange,
  pattern,
  error
}) {
  return (
    <div className="form-group auth-color">
              <input 
                  type={type} 
                  id="form-field"
                  className={classnames("form-control auth-color form-control-lg form-area",{
                    "is-invalid": error
                  })} 
                  placeholder="" 
                  value={value} 
                  onChange={onChange} 
                  name={name} 
                  pattern={pattern}
              />
              <label htmlFor="form-field" className="form-label auth-color">{placeholder}</label>
              <div className='invalid-feedback'>
                {error}
                </div>
              {/* {info && <small className= "form-text text-muted">{info}</small>}
              {error && (<div className="invalid-feedback">{error}</div>)} */}
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
