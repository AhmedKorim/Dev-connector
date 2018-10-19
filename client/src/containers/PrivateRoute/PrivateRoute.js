import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux';
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({component: Component, auth, rest}) => (
    <Route
        {...rest}
        render={props => auth.isAuthenticated ? <Component {...props}/>
            :
            <Redirect to="/login"/>
        }
    />
)
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(PrivateRoute);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}