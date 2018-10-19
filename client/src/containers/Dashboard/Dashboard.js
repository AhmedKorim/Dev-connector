import PropTypes from 'prop-types'
import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import Spinner from "../../components/UI/spinner";
import {getCurrentProfile} from "../../store/actions/profileActions";
import ProfileActions from "./profileActions";

class Dashboard extends React.Component {

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
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="col-md-12">
                        <h1 className="display-4">dashboard</h1>
                        {
                            profile === null ||loading ? <Spinner/>
                                : user && profile ? <div>
                                    <p className="lead">welcome<Link to={`/profile/`}> {user.name}</Link></p>
                                    <ProfileActions/>
                                </div> :
                                <h3>please login</h3>
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
export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.any.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}