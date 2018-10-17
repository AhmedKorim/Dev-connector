import {connect} from "react-redux";
import React, {Component, Fragment} from 'react';
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Footer from "../components/layout/Footer";
import Landing from "../components/layout/Landing";
import Navbar from "../components/layout/Navbar";
import {Route} from 'react-router-dom';
import jwt_decore from 'jwt-decode';
import store from '../store/store';
import './App.css';
import {logoutUser, setCurrentUser} from "../store/actions/authActions";
import setAuthToken from "../utils/setAuthToken";


class App extends Component {


    componentDidMount() {
        // check for token
        if (localStorage.jwtToken) {
            const decoded = jwt_decore(localStorage.jwtToken);
            // check the data from the token
            const currentTime = Date.now();
            if (decoded.exp > currentTime/1000) {
                const expirationTimeout = decoded.exp*1000 - currentTime;
                setTimeout(_=> store.dispatch(logoutUser) , expirationTimeout);
                // add header
                setAuthToken(localStorage.jwtToken);
                // populate user with redux
                store.dispatch(setCurrentUser(decoded))
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
                            exact
                            component={Login}
                        />
                    </div>
                </main>
                <Footer/>
            </Fragment>

        )
    };
}

export default App;
