import React from 'react';
import {connect} from 'react-redux';
import {getCurrentProfile} from "../../store/actions/profileActions";

class Dashboard extends React.Component {

    componentDidMount() {
        this.props.getCurrentProfile();
    }


    render() {
        return (
            <div>dashboard</div>
        )
    }
}

export default connect(null, {getCurrentProfile})(Dashboard);