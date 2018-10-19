import PropTypes from 'prop-types'
import React from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import InputGroup from "../../components/UI/InputGoup/InputGroup";
import SelectInput from "../../components/UI/SelectInput/SelectInput";
import TextArea from "../../components/UI/TextArea/TextArea";
import TextField from "../../components/UI/TextField/TextField";
import {createProfile, getCurrentProfile} from "../../store/actions/profileActions";

const options = [
    {label: "* select professional status", value: 0},
    {label: "Developer", value: "Developer"},
    {label: "Junior Developer", value: "Junior Developer "},
    {label: "Senior Developer", value: "Senior Developer"},
    {label: "Manger", value: "Manger"},
    {label: "Student or Learning", value: "Student or Learning"},
    {label: "Instructor or Teacher", value: "Instructor or Teacher"},
    {label: "Intern", value: "Intern"},
    {label: "Other", value: "Other"},
]

class EditProfile extends React.Component {
    state = {
        displaySocialInputs: false,
        controllers: {
            handle: "",
            status: "",
            company: "",
            website: "",
            location: "",
            skills: "",
            githubUsername: "",
            bio: "",
            twitter: "",
            facebook: "",
            linkedin: "",
            youtube: "",
            instagram: "",
        },
        errors: {}
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state.controllers);
        this.props.createProfile(this.state.controllers, this.props.history)
    }
    changeHandler = ({target: {value}}, target) => {
        this.setState({
            ...this.state,
            controllers: {
                ...this.state.controllers,
                [target]: value
            }
        })
    }
    toggleSocialInputs = () => {
        this.setState(prevState => ({
            displaySocialInputs: !prevState.displaySocialInputs
        }))
    }

    componentDidMount() {
        this.props.getCurrentProfile();
        const newControllers = {};
        for (const key in this.state.controllers) {
            if (key !== 'skills') {
                newControllers[key] = this.props.profile[key];
            } else {
                newControllers[key] = this.props.profile[key].join(",");
            }
        }
        this.setState({controllers: newControllers});
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }


    render() {
        const {
            submitHandler,
            changeHandler,
            toggleSocialInputs,
            state: {
                controllers: {
                    handle,
                    status,
                    company,
                    website,
                    location,
                    skills,
                    githubUsername,
                    bio,
                    twitter,
                    facebook,
                    linkedin,
                    youtube,
                    instagram,
                },
                errors,
                displaySocialInputs
            }
        } = this;

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go back</Link>

                            <h1 className="display-4 text-center">edit profile</h1>
                            <small className="d-block pb-3">* =required fields</small>
                            <form onSubmit={submitHandler}>
                                <TextField
                                    placeholder="*Profile handle"
                                    value={handle}
                                    name="handle"
                                    error={errors.handle}
                                    onChange={changeHandler}
                                    info="A unique handle for your profile URL"
                                />
                                <SelectInput
                                    placeholder="*status"
                                    name="status"
                                    options={options}
                                    value={status}
                                    error={errors.status}
                                    onChange={changeHandler}
                                    info="give us an idea where you are at career"
                                />
                                <TextField
                                    placeholder="company"
                                    value={company}
                                    name="company"
                                    error={errors.company}
                                    onChange={changeHandler}
                                    info="Could be your own company or one you work for"
                                />
                                <TextField
                                    placeholder="website"
                                    value={website}
                                    name="website"
                                    error={errors.website}
                                    onChange={changeHandler}
                                    info="Could be your own website or one you work for"
                                /> <TextField
                                placeholder="location"
                                value={location}
                                name="location"
                                error={errors.location}
                                onChange={changeHandler}
                                info="Could be your own location or one you work for"
                            />
                                <TextField
                                    placeholder="skills"
                                    value={skills}
                                    name="skills"
                                    error={errors.skills}
                                    onChange={changeHandler}
                                    info={"please enter comma( , ) separated list of your skills"}
                                />
                                <TextField
                                    placeholder="your github user name"
                                    value={githubUsername}
                                    name="githubUsername"
                                    error={errors.githubUsername}
                                    onChange={changeHandler}
                                    info="will help to fetch you latest 5 repos to your profile"
                                />
                                <TextArea
                                    placeholder="bio"
                                    value={bio}
                                    name="bio"
                                    onChange={changeHandler}
                                    info="describe your self and talk about your gals and what makes you special"
                                />
                                <div className="mb-3">
                                    <button type="button" className="btn btn-lite" onClick={toggleSocialInputs}>Add Social profiles</button>
                                    <span className="text-muted">optional</span>
                                </div>
                                {
                                    displaySocialInputs && <div>
                                        <InputGroup
                                            placeholder="Twitter profile URL"
                                            name="twitter"
                                            value={twitter}
                                            error={errors.twitter}
                                            onChange={changeHandler}
                                            icon="fab fa-twitter"
                                        /> <InputGroup
                                        placeholder="Facebook profile URL"
                                        name="facebook"
                                        value={facebook}
                                        error={errors.facebook}
                                        onChange={changeHandler}
                                        icon="fab fa-facebook"
                                    /> <InputGroup
                                        placeholder="Youtube profile URL"
                                        name="youtube"
                                        icon="fab fa-youtube"
                                        value={youtube}
                                        error={errors.youtube}
                                        onChange={changeHandler}
                                    /> <InputGroup
                                        placeholder="Linkedin profile URL"
                                        value={linkedin}
                                        error={errors.linkedin}
                                        onChange={changeHandler}
                                        icon="fab fa-linkedin"
                                        name="linkedin"
                                    /><InputGroup
                                        placeholder="Instagram profile URL"
                                        value={instagram}
                                        error={errors.instagram}
                                        onChange={changeHandler}
                                        icon="fab fa-instagram"
                                        name="instagram"
                                    />
                                    </div>
                                }
                                <button className="btn btn-info btn-block-mt-4" type="submit">Edit Profile</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile.profile,
    errors: state.errors.errors
})
const mapDispatchToProps = dispatch => ({
    createProfile: (profileData, history) => dispatch(createProfile(profileData, history)),
    getCurrentProfile: () => dispatch(getCurrentProfile())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile));

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}