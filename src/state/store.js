import { applyMiddleware, createStore } from "redux";
import persistReducer from './reducers/index'
import thunk from "redux-thunk";

export const store = createStore(
    persistReducer,
    {},
    applyMiddleware(thunk)
)
