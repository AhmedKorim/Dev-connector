import React from 'react';
import axios from "axios";
import classnames from 'classnames';

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
        console.log(this.state.controllers);
        console.log('sending request');
        axios.post('/api/users/register', this.state.controllers)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err.response.data.errors);
                this.setState({errors: err.response.data.errors})
                console.log(this.state);
            })
    }

    render() {
        const {
            state: {
                controllers,
                errors: {
                    name,
                    email,
                    password,
                    password2
                },
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
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg",
                                        {
                                            "is-invalid": name
                                        })} placeholder="Name" onChange={e => handleChange(e, "name")}
                                           value={controllers.name} name="name"
                                    />
                                    {name && <div className="invalid-feedback">{name}</div>}
                                </div>
                                <div className="form-group">
                                    <input type="email" className={classnames("form-control form-control-lg",
                                        {
                                            "is-invalid": email
                                        })} placeholder="Email Address"
                                           onChange={e => handleChange(e, "email")} value={controllers.email}
                                           name="email"/>
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                    {email && <div className="invalid-feedback">{email}</div>}
                                </div>
                                <div className="form-group">
                                    <input type="password" autoComplete="on" className={classnames("form-control form-control-lg",
                                        {
                                            "is-invalid": password
                                        })} placeholder="Password"
                                           onChange={e => handleChange(e, "password")} value={controllers.password}
                                           name="password"/>
                                    {password && <div className="invalid-feedback">{password}</div>}
                                </div>
                                <div className="form-group">
                                    <input type="password" autoComplete="on" className={classnames("form-control form-control-lg",
                                        {
                                            "is-invalid": password2
                                        })} placeholder="Confirm Password"
                                           onChange={e => handleChange(e, "password2")} value={controllers.password2}
                                           name="password2"/>
                                    {password2 && <div className="invalid-feedback">{password2}</div>}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;