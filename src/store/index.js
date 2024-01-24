import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { rootReducer } from "./rootReducer";

export const store = (state = {}) => {
  return createStore(rootReducer, state, applyMiddleware(thunk));
};
