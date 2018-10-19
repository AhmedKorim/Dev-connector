import PropTypes from 'prop-types'
import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import Spinner from "../../components/UI/spinner";
import {deleteAccount, getCurrentProfile} from "../../store/actions/profileActions";
import isEmpty from "../../utils/isEmpty";
import DashboardActions from "./DashboardActions";

class Dashboard extends React.Component {

    deleteHandler = () => {
        this.props.deleteAccount();

    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {
        const {
            auth: {
                user
            },
            profile: {
                profile,
                loading
            },
            errors
        }
            = this.props;
        const {deleteHandler} = this;
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="col-md-12">
                        <h1 className="display-4">dashboard</h1>
                        {
                            profile === null || loading ? <Spinner/>
                                : user && !isEmpty(profile) ? <div>
                                    <p className="lead">welcome<Link to={`/profile/`}> {user.name}</Link></p>
                                    <DashboardActions/>
                                    {/* TODO EXP AND EDU*/}
                                    <div style={{marginBottom: 60}}/>
                                    <button className="btn btn-danger text-capitalize" onClick={deleteHandler}>delete account</button>
                                </div> : user ? <Link class="btn btn-info" to="/create-profile">create profile</Link> :
                                <h3> please login </h3>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile,
        auth: state.auth,
        errors: state.errors.errors
    }
}
export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.any.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func
}