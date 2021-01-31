import request from "../helpers/request";
import * as actionTypes from "./userActionTypes";

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

