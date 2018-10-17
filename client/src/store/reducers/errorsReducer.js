import {SET_ERRORS} from "../actions/actionsTypes";

const initialState = {
    errors:{}
};

const errorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                errors: (action.payload.errors) ||{}
            };
        default :
            return {
                ...state
            }
    }

}
export default errorsReducer;
