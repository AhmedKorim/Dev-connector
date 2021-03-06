import isEmpty from "../../utils/isEmpty";
import {SET_CURRENT_USER} from "../actions/actionsTypes";

const initialState = {
    isAuthenticated: false,
    user: {},
};
export default (state = initialState, action) => {

    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload.user),
                user: action.payload.user
            };
        default:
            return state;
    }
}