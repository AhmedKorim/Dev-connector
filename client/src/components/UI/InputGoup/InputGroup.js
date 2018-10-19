import classnames from "classnames";
import PropTypes from 'prop-types'
import React from 'react'

const InputGroup = ({name, type, placeholder, value, error, onChange, icon, other}) => {

    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon}/>
                </span>
            </div>
            <input
                type={type || 'text'}
                className={classnames("form-control form-control-lg", {"is-invalid": error})}
                placeholder={placeholder}
                value={value}
                {...(other || {})}
                onChange={(e) => onChange(e, name)} name={name}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}
export default InputGroup;

InputGroup.propTypes = {
    error: PropTypes.object,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string
}