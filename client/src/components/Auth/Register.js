import PropTypes from 'prop-types'
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {registerUser} from "../../store/actions/authActions";
import TextField from "../UI/TextField/TextField";

class Register extends React.Component {
    state = {
        controllers: {
            name: "",
            email: "",
            password: "",
            password2: "",
        },

        errors: {}
    }
    handleChange = ({target: {value}}, target) => {
        this.setState({
            controllers: {
                ...this.state.controllers,
                [target]: value
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.register(this.state.controllers, this.props.history);
    }


    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        const {
            state: {
                controllers,

            },
            props: {
                errors: {
                    name,
                    email,
                    password,
                    password2
                }
            },
            handleChange, handleSubmit
        } = this;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form noValidate onSubmit={handleSubmit}>
                                <TextField
                                    error={name}
                                    label="name"
                                    value={controllers.name}
                                    name="name"
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="Name"
                                />
                                <TextField
                                    error={email}
                                    label="email"
                                    value={controllers.email}
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                    placeholder="email"
                                />
                                <TextField
                                    error={password}
                                    onChange={handleChange}
                                    label="password"
                                    value={controllers.password}
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                /> <TextField
                                error={password2}
                                label="confirm password" onChange={handleChange}
                                onChange={handleChange}
                                value={controllers.password2}
                                name="password2"
                                type="password"
                                placeholder="confirm password"
                            />
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapsStateToProps = state => {
    return {
        errors: state.errors.errors,
        isAuthenticated: state.auth.isAuthenticated
    }
}
const mapDispatchToProps = dispatch => {
    return {
        register: (userData, history) => dispatch(registerUser(userData, history))
    }

}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

export default withRouter(connect(mapsStateToProps, mapDispatchToProps)(Register));

