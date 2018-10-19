import PropTypes from 'prop-types'
import React from 'react';
import Moment from "react-moment";
import {connect} from "react-redux";
import {deleteEducation} from "../../store/actions/profileActions";

class EduWrapper extends React.Component {
    render() {
        const {education, deleteEducation} = this.props;
        return (
            <div>
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table table-hover  ">
                    <thead>
                    <tr>
                        <th>school</th>
                        <th>field fo study</th>
                        <th>period</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        education.map(exp => <tr key={exp._id}>
                            <td>{exp.school}</td>
                            <td>{exp.fieldOfStudy}</td>
                            <td>
                                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                                {exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : 'now'}
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteEducation(exp._id)}>Delete</button>
                            </td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(null, {deleteEducation})(EduWrapper);

EduWrapper.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}