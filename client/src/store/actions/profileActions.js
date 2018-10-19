import axios from 'axios';
import {CLEAR_CURRENT_PROFILE, GET_PROFILE, PROFILE_LOADING} from "./actionsTypes";
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
export const getCurrentProfile = _ => dispatch => {
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
                        payload: null
                    })
                    dispatch(setErrors({unauthorized: "Unauthorized"}));
                } else {
                    dispatch({
                        type: GET_PROFILE,
                        payload: {}
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