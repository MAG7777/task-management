import request from "../helpers/request";
import * as actionTypes from "./userActionTypes";
import { saveJWT, removeJWT, getJWT } from "../helpers/auth";

const apiURL = process.env.REACT_APP_API_URL;



export function register(data) {
    let url = `${apiURL}/user`;

    return (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING });

        request(url, "POST", data)
            .then((response) => {
                dispatch({ type: actionTypes.REGISTER_SUCCESS, userId: response._id });
            })
            .catch((err) => {
                dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
            });
    };
}

export function login(data) {
    let url = `${apiURL}/user/sign-in`;

    return (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING });

        request(url, "POST", data)
            .then((token) => {
                removeJWT(token);
                dispatch({ type: actionTypes.LOGIN_SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
            });
    };
}

export function logout() {
    let url = `${apiURL}/user/sign-out`;

    return (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING });
        request(url, "POST", { jwt: getJWT() })
            .then(() => {
                saveJWT();
                dispatch({ type: actionTypes.LOGOUT_SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
            });
    };
}

