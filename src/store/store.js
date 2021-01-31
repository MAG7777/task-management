import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { taskReducer } from "./taskReducer";
import { authReducer } from "./authReducer";

const middlewaresArray = [thunkMiddleware];
if (process.env.NODE_ENV === "development") {
    middlewaresArray.push(loggerMiddleware)
}

const middlewares = applyMiddleware(...middlewaresArray);

const mainReducer = combineReducers({
    taskReducer,
    authReducer
});

export const store = createStore(mainReducer, middlewares);