import PropTypes from 'prop-types'
import React from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import TextArea from "../../../components/UI/TextArea/TextArea";
import TextField from "../../../components/UI/TextField/TextField";
import {addEducation} from "../../../store/actions/profileActions";

class AddEducation extends React.Component {
    state = {
        controllers: {
            school: "",
            degree: "",
            fieldOfStudy: "",
            from: "",
            to: Date.now(),
            current: false,
            description: "",
        },
        errors: {},
        disabled: false
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.addEducation(this.state.controllers, this.props.history)
    }
    handleChange = ({target: {value}}, target) => {
        console.log(value);
        this.setState({
            controllers: {
                ...this.state.controllers,
                [target]: value
            }
        })
    }
    handleCheck = (e, target) => {
        this.setState(prevState => ({
            disabled: !prevState.disabled,
            controllers: {
                ...prevState.controllers,
                current: !prevState.controllers.current
            }
        }))

        console.log(e.target.checked);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }

    }

    render() {
        const {
            state: {
                controllers: {
                    school,
                    degree,
                    fieldOfStudy,
                    from,
                    to,
                    current,
                    description,
                },
                disabled, errors
            },
            handleSubmit,
            handleChange,
            handleCheck
        } = this;
        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go back</Link>
                            <h1 className="display-4 text-center">Add experience</h1>
                            <p className="lead">Add any certificate or training you had in the past or current</p>
                            <small className="d-block mb-3">*=Required fields</small>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    placeholder="school"
                                    onChange={handleChange}
                                    name="school"
                                    error={errors.school}
                                    value={school}
                                /> <TextField
                                placeholder="degree"
                                onChange={handleChange}
                                name="degree"
                                error={errors.degree}
                                value={degree}
                            /> <TextField
                                placeholder="fieldOfStudy"
                                onChange={handleChange}
                                name="fieldOfStudy"
                                error={errors.fieldOfStudy}
                                value={fieldOfStudy}
                            /> <TextField
                                placeholder="from"
                                onChange={handleChange}
                                name="from"
                                type="date"
                                error={errors.from}
                                value={from}
                            /> <TextField
                                placeholder="to"
                                type="date"
                                disabled={disabled}
                                onChange={handleChange}
                                name="to"
                                error={errors.to}
                                value={to}
                            />
                                <div className="mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        value={current}
                                        onChange={(e) => handleCheck(e, 'current')}
                                        checked={current}
                                        id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">
                                        Current school
                                    </label>
                                </div>
                                <TextArea
                                    placeholder="description"
                                    onChange={handleChange}
                                    name="description"
                                    error={errors.description}
                                    value={description}
                                />
                                <input type="submit" className="btn btn-block mt-4 btn-primary"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addEducation: (eduData, history) => dispatch(addEducation(eduData, history))
    }
}
const mapStateToProps = state => {
    return {
        profile: state.profile.profile,
        errors: state.errors.errors
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEducation));

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addEducation: PropTypes.func.isRequired,
}