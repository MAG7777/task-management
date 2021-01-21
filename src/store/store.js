import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import {mainReducer} from "./reducer";

const middlewares = applyMiddleware(loggerMiddleware, thunkMiddleware);

export const store = createStore(mainReducer, middlewares);
