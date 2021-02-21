import request from "../helpers/request";
import * as actionTypes from "./userActionTypes";
import { saveJWT, removeJWT, getJWT } from "../helpers/auth";
import { history } from "./../helpers/history";
import { loginRequest, registerRequest } from "../helpers/auth";

const apiURL = process.env.REACT_APP_API_URL;



export function register(data) {
    return (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING });

        registerRequest(data)
            .then((response) => {
                dispatch({ type: actionTypes.REGISTER_SUCCESS, userId: response._id });
                history.push('/login');
            })
            .catch((err) => {
                dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
            });
    };
}

export function login(data) {
    return (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING });

        loginRequest(data)
            .then((token) => {
                saveJWT(token);
                dispatch({ type: actionTypes.LOGIN_SUCCESS });
                history.push('/');
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
                removeJWT();
                dispatch({ type: actionTypes.LOGOUT_SUCCESS });
                history.push('/login')
            })
            .catch((err) => {
                dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
            });
    };
}

