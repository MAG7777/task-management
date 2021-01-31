import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunk from "redux-thunk";
import thunkMiddleware from "redux-thunk";
import { mainReducer } from "./reducer";

const middlewaresArray = [thunk];
if (process.env.NODE_ENV === "development") {
    middlewaresArray.push(loggerMiddleware)
}

const middlewares = applyMiddleware(...middlewaresArray);

export const store = createStore(mainReducer, middlewares);
