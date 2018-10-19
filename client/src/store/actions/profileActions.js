import axios from 'axios';
import {CLEAR_CURRENT_PROFILE, GET_PROFILE, PROFILE_LOADING} from "./actionsTypes";
import {setCurrentUser} from "./authActions";
import {setErrors} from "./errorsActions";

// actionCreator

//profile loading
export const setProfileLoading = loading => {
    return {
        type: PROFILE_LOADING,
        payload: loading
    }
}
export const clearCurrentProfile = _ => {
    return {
        type: CLEAR_CURRENT_PROFILE,
    }
}

// get current profile
export const    getCurrentProfile = _ => dispatch => {
    dispatch(setProfileLoading(true));
    axios.get('/api/profile')
        .then(res => {
            dispatch(setProfileLoading(false));
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(error => {
            if (error.response) {

                dispatch(setProfileLoading(false));

                if (error.response.data === "Unauthorized") {
                    dispatch({
                        type: GET_PROFILE,
                        payload: {profile: null}
                    })
                    dispatch(setErrors({unauthorized: "Unauthorized"}));
                } else {
                    dispatch({
                        type: GET_PROFILE,
                        payload: {profile: {}}
                    })
                    dispatch(setErrors(error.response.data.errors));
                }

            }

        })
}

// create poriflee
export const createProfile = (profileData, history) => dispatch => {

    axios.post('/api/profile', profileData)
        .then(res => {
            history.push('/dashboard');
        })
        .catch(err => dispatch(setErrors(err.response.data)))
}

// add exp
export const addExperience = (expData, history) => dispatch => {
    axios
        .post('/api/profile/experience', expData)
        .then(res => {
            history.push('/dashboard')
        })
        .catch(err => {
            dispatch(setErrors(err.response.data.errors));
        })
}

// add exp
export const addEducation = (eduData, history) => dispatch => {
    axios
        .post('/api/profile/education', eduData)
        .then(res => {
            history.push('/dashboard')
        })
        .catch(err => {
            dispatch(setErrors(err.response.data.errors));
        })
}

// delete exp
export const deleteExperience = id => dispatch => {
    axios.delete('/api/profile/experience/' + id)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(er => {
            dispatch(setErrors(er.response.data.errors))
        })
}

// delete exp
export const deleteEducation = id => dispatch => {
    axios.delete('/api/profile/education/' + id)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(er => {
            dispatch(setErrors(er.response.data.errors))
        })
}


// delete account
export const deleteAccount = _ => dispatch => {
    if (window.confirm('Are you sure this cannot be undone ?')) {
        axios.delete('/api/profile')
            .then(res =>
                dispatch(setCurrentUser({}))
            ).catch(err => {
            dispatch(setErrors(err.response.data.errors))
        })
    }
}