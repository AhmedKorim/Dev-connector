import classnames from "classnames";
import PropTypes from 'prop-types'
import React from 'react'

const TextArea = ({name, placeholder, value, error, type, onChange, info, other}) => {

    return (
        <div className="form-group">
            <textarea
                className={classnames("form-control form-control-lg", {"is-invalid": error})}
                placeholder={placeholder}
                value={value}
                {...(other || {})}
                onChange={(e) => onChange(e, name)} name={name}/>
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}
export default TextArea;

TextArea.propTypes = {
    error: PropTypes.object,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string
}