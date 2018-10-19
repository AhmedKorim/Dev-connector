import PropTypes from 'prop-types'
import React from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import TextArea from "../../../components/UI/TextArea/TextArea";
import TextField from "../../../components/UI/TextField/TextField";
import {addExperience} from "../../../store/actions/profileActions";

class AddExperience extends React.Component {
    state = {
        controllers: {
            company: "",
            title: "",
            location: "",
            from: "",
            to: "",
            current: false,
            description: "",
        },
        errors: {},
        disabled: false
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.addExperience(this.state.controllers, this.props.history)
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
                    company,
                    title,
                    location,
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
                            <p className="lead">Add any job or position you had in the past or current</p>
                            <small className="d-block mb-3">*=Required fields</small>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    placeholder="company"
                                    onChange={handleChange}
                                    name="company"
                                    error={errors.company}
                                    value={company}
                                /> <TextField
                                placeholder="title"
                                onChange={handleChange}
                                name="title"
                                error={errors.title}
                                value={title}
                            /> <TextField
                                placeholder="location"
                                onChange={handleChange}
                                name="location"
                                error={errors.location}
                                value={location}
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
                                        Current job
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
        addExperience: (expData, history) => dispatch(addExperience(expData, history))
    }
}
const mapStateToProps = state => {
    return {
        profile: state.profile.profile,
        errors: state.errors.errors
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddExperience));

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired,
}