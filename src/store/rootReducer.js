import { combineReducers } from "redux";
import { userReducer } from "./user/index";
import { forecastReducer } from "./forecast/index";
import { bulkForecastReducer } from "./bulkForecast/index";

export const rootReducer = combineReducers({
  forecast: forecastReducer,
  bulkForecast: bulkForecastReducer,
  user: userReducer,
});
