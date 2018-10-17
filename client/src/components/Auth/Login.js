import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import classnames from 'classnames';
import {loginUser} from "../../store/actions/authActions";
import TextField from "../UI/TextField/TextField";

class Login extends React.Component {
    state = {
        controllers: {
            email: "",
            password: "",
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
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
        this.props.loginUser(this.state.controllers)
    }


    render() {
        const {
            state: {
                controllers
            },
            props:{
                errors:{
                    email,
                    password,
                }
            },
            handleChange, handleSubmit
        } = this;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                 error={email}
                                 label="email"
                                 placeholder="email"
                                 onChange={handleChange}
                                 name="email"
                                 value={controllers.email}
                                /> <TextField
                                 error={password}
                                 label="password"
                                 placeholder="password"
                                 onChange={handleChange}
                                 name="password"
                                 value={controllers.password}
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
const mapStateToProps = state =>{
    return {
        auth:state.auth,
        errors:state.errors.errors
    }
}

Login.propTypes ={
    loginUser:propTypes.func.isRequired,
    auth:propTypes.object.isRequired,
    errors:propTypes.object.isRequired
}
export default connect(mapStateToProps,{loginUser})(Login);