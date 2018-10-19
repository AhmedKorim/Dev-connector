import classnames from "classnames";
import PropTypes from 'prop-types'
import React from 'react'

const SelectInput = ({name, value, error, type, options, onChange, info, other}) => {

    return (
        <div className="form-group">
            <select
                className={classnames("form-control form-control-lg", {"is-invalid": error})}
                value={value}
                {...(other || {})}
                onChange={(e) => onChange(e, name)} name={name}
            >
                {(options || []).map(option => <option
                    key={option.label}
                    value={option.value}>
                    {option.label}
                </option>)}
            </select>
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}
export default SelectInput;

SelectInput.propTypes = {
    error: PropTypes.object,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    options: PropTypes.array.isRequired,
}