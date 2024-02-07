import { combineReducers } from "redux";
import { userReducer } from "./user/index";
import { forecastReducer } from "./forecast/index";

export const rootReducer = combineReducers({
  forecast: forecastReducer,
  user: userReducer,
});
