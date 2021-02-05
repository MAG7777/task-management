import * as userAction from "./userActionTypes";
import {checkLoginStatus} from "./../helpers/auth";

const defaultState = {
  userId: null,
  registerSuccess: false,
  successMessage:"",
  isLogin: checkLoginStatus()
};

export const authReducer = (state = defaultState, action) => {
  const loadingState = {
    ...state,
    loading: true,
    successMessage: null,
    error: null,
  };

  switch (action.type) {
    case userAction.AUTH_LOADING:
      return loadingState;

    case userAction.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case userAction.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registerSuccess: true,
        successMessage:"You have successfuly registered"
      };

      case userAction.LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          isLogin: true
        };

        case userAction.LOGOUT_SUCCESS:
          return {
            ...state,
            loading: false,
            isLogin: false
          };


    default:
      return state;
  }
};
