import React, {Component, Fragment} from 'react';
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Footer from "../components/layout/Footer";
import Landing from "../components/layout/Landing";
import Navbar from "../components/layout/Navbar";
import {Route} from 'react-router-dom';
import './App.css';

class App extends Component {
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
