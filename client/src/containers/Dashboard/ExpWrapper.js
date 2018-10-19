import PropTypes from 'prop-types'
import React from 'react';
import Moment from "react-moment";
import {connect} from "react-redux";
import {deleteExperience} from "../../store/actions/profileActions";

class ExpWrapper extends React.Component {
    render() {
        const {experience,deleteExperience} = this.props;
        return (
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table table-hover  ">
                    <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>period</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        experience.map(exp => <tr key={exp._id}>
                            <td>{exp.company}</td>
                            <td>{exp.title}</td>
                            <td>
                                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                                {exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : 'now'}
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteExperience(exp._id)}>Delete</button>
                            </td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(null, {deleteExperience})(ExpWrapper);

ExpWrapper.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}