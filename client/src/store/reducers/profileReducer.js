import {CLEAR_CURRENT_PROFILE, GET_PROFILE, PROFILE_LOADING} from "../actions/actionsTypes";

const initialState = {
    profile: null,
    profiles: null,
    loading: false,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload

            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null

            }
        default :
            return state

    }

}
export default profileReducer;
