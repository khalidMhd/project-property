import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
    USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, 
} from "../contant/auth";

function signinReducer(state = {}, action) {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true }
        case USER_SIGNIN_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        // case USER_LOGOUT:
        //     return {};
        default: return state;
    }
}

function signupReducer(state = {}, action) {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true }
        case USER_SIGNUP_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload }
        default: return state
    }
}


function PasswordEditReducer (state = { passwordEdit: {} }, action) {
    switch (action.type) {
        case UPDATE_PASSWORD_REQUEST:
            return { loading: true, passwordEdit: {} }

        case UPDATE_PASSWORD_SUCCESS:
            return { loading: false, success: true, passwordEdit: action.payload }

        case UPDATE_PASSWORD_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export { signinReducer, signupReducer, PasswordEditReducer};