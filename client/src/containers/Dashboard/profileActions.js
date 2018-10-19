import React from 'react'

const   ProfileActions = props => {
    return (
        <div>
            <div className="btn-group mb-4" role="group">
                <link to="/edit-profile" className="btn btn-light">
                    <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile
                </link>
                <link to="/add-experience" className="btn btn-light">
                    <i className="fab fa-black-tie text-info mr-1"></i>
                    Add Experience
                </link>
                <link to="/add-education" className="btn btn-light">
                    <i className="fas fa-graduation-cap text-info mr-1"></i>
                    Add Education
                </link>
            </div>
        </div>
    )
}
export default ProfileActions