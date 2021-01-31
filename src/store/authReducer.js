import * as userAction from "./userActionTypes";

const defaultState = {
  userId: null,
  registerSuccess: false,
  successMessage:""
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


    default:
      return state;
  }
};
