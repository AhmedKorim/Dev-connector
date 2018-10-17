import React from 'react';

class Login extends React.Component {
    state = {
        controllers: {
            email: "",
            password: "",
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
        console.log(this.state.controllers);
    }


    render() {
        const {
            state: {
                controllers
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
                                <div className="form-group">
                                    <input type="email" autoComplete="on" className="form-control form-control-lg" placeholder="Email Address"
                                           value={controllers.email}
                                           onChange={(e) => handleChange(e, "email")} name="email"/>
                                </div>
                                <div className="form-group">
                                    <input type="password" autoComplete="on" className="form-control form-control-lg" placeholder="Password"
                                           value={controllers.password}
                                           onChange={(e) => handleChange(e, "password")} name="password"/>
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

export default Login;