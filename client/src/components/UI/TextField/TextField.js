import PropTypes from 'prop-types'
import classnames from "classnames";
import React from 'react'
const TextField = ({name, placeholder, value, label, error,type,onChange,disabled,info,other}) => {

    return (
        <div className="form-group">
            <input type={type ||"text"} autoComplete="on"
                   className={classnames("form-control form-control-lg", {"is-invalid": error})}
                   placeholder={placeholder}
                   value={value}
                   disabled={disabled}
                   {...(other||{})}
                   onChange={(e) => onChange(e, name)} name={name}/>
            {info && <small className="form-text text-muted">{info}</small> }
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}
export default TextField

TextField.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.object,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
    info: PropTypes.string
}