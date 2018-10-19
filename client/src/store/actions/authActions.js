import axios from 'axios';
import jwt_deoce from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import {SET_CURRENT_USER} from "./actionsTypes";
import {setErrors} from "./errorsActions";
import {clearCurrentProfile} from "./profileActions";


export const setCurrentUser = userDate => {
    return {
        type: SET_CURRENT_USER,
        payload: {
            user: userDate
        }
    }

}

export const registerUser = (userData, history) => dispatch => {

    axios.post('/api/users/register', userData)
        .then(_ => {
            history.push('/login');
            dispatch(setErrors({}));
        })
        .catch(error => dispatch(setErrors(error.response.data.errors)))
}

export const loginUser = (userData, history) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // clear errors if any
            dispatch(setErrors({}));
            // user data from the response
            const {token, user} = res.data;
            //save token to local storage
            localStorage.setItem("jwtToken", token);
            // set token to requests headers
            setAuthToken(token);
            // extract user info from the token || get it from the response
            if (token) {
                const decodedData = jwt_deoce(token);
                dispatch(setCurrentUser(decodedData));
            }
        })
        .catch(error => {
            if (error.response) {
                dispatch(setErrors(error.response.data.errors));
            }
        })
}

export const logoutUser = _ => dispatch => {
    // remove the token
    localStorage.removeItem('jwtToken');
    // remove auth header for future request
    setAuthToken(false);
    //set current user to {} to set isAuthenticated to false
    dispatch(setCurrentUser({}));
    dispatch(clearCurrentProfile());
}