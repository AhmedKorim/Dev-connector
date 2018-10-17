import {SET_ERRORS} from "./actionsTypes";

export const setErrors = errors => {
    return {
        type: SET_ERRORS,
        payload: {
            errors
        }
    }
}