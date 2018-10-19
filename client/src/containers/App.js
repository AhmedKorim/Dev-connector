import jwt_decore from 'jwt-decode';
import React, {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Footer from "../components/layout/Footer";
import Landing from "../components/layout/Landing";
import Navbar from "../components/layout/Navbar";
import {logoutUser, setCurrentUser} from "../store/actions/authActions";
import {getCurrentProfile} from "../store/actions/profileActions";
import store from '../store/store';
import setAuthToken from "../utils/setAuthToken";
import './App.css';
import CreateProfile from "./CreateProfile/CreateProfile";
import Dashboard from "./Dashboard/Dashboard";
import EditProfile from "./EditProfile/EditProfile";
import PrivateRoute from "./PrivateRoute/PrivateRoute";


class App extends Component {


    componentDidMount() {
        // check for token
        if (localStorage.jwtToken) {
            const decoded = jwt_decore(localStorage.jwtToken);
            // check the data from the token
            const currentTime = Date.now();
            if (decoded.exp > currentTime / 1000) {
                const expirationTimeout = decoded.exp * 1000 - currentTime;
                setTimeout(_ => store.dispatch(logoutUser), expirationTimeout);
                // add header
                setAuthToken(localStorage.jwtToken);
                // populate user with redux
                store.dispatch(setCurrentUser(decoded))
                // get user account
                store.dispatch(getCurrentProfile());
            }
        }
    }


    render() {
        return (
            <Fragment>
                <Navbar/>
                <main>
                    <Route
                        path="/"
                        exact
                        component={Landing}
                    />
                    <div className="container">
                        <Route
                            path="/register"
                            exact
                            component={Register}
                        />
                        <Route
                            path="/login"
                            component={Login}
                        />
                        <Switch>
                            <PrivateRoute
                                path="/dashboard"
                                exact
                                component={Dashboard}
                            />
                        </Switch>
                        <Switch>
                            <PrivateRoute
                                path="/create-profile"
                                exact
                                component={CreateProfile}
                            />
                            <PrivateRoute
                                path="/edit-profile"
                                exact
                                component={EditProfile}
                            />
                        </Switch>
                    </div>
                </main>
                <Footer/>
            </Fragment>

        )
    };
}

export default App;
