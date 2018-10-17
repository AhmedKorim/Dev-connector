import PropTypes from 'prop-types'
import {connect} from "react-redux";
import React from 'react';
import {NavLink} from "react-router-dom";
import {logoutUser} from "../../store/actions/authActions";

class Navbar extends React.Component {
    onLogoutUser = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    }


    render() {
        const {
            auth: {
                isAuthenticated,
                user
            },
        } = this.props;
        const {onLogoutUser} = this;
        const authLinks = (<ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <NavLink aria-label="go to profile" title="profile" className="nav-link" to="/profile">  <img src={user.avatar} alt={user.name} title="You must have Gravatar connected to your email to show it"
                                                                   className="rounded-circle" style={{width: 25, marginRight: 5}}
                /></NavLink>
            </li>
            <li className="nav-item">
                <a href="#" aria-label="logout" role="button" className="nav-link" onClick={onLogoutUser}>
                  logout
                </a>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">dashboard</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/feed">feed</NavLink>
            </li>
        </ul>);
        const gistLinks = (<ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/register">Sign Up</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
        </ul>);

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">DevConnector</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profiles"> Developers
                                </NavLink>
                            </li>
                        </ul>
                        {isAuthenticated ? authLinks : gistLinks}
                    </div>
                </div>
            </nav>

        )
    }
}

const mapsTateToProps = state => {
    return {
        auth: state.auth
    }
}
export default connect(mapsTateToProps, {logoutUser})(Navbar);

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}