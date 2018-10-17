import axios from 'axios';
import {GET_PROFILE, PROFILE_LOADING} from "./actionsTypes";
import {setErrors} from "./errorsActions";

// actionCreator

//profile loading
export const setProfileLoading = loading => {
    return {
        type: PROFILE_LOADING,
        payload: loading
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
            dispatch(setProfileLoading(false));
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
            dispatch(setErrors(error.response.data.errors))
        })
}