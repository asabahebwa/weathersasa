
import { combineReducers } from "@reduxjs/toolkit";
import forecastReducer from "./forecast/index";
import bulkForecastReducer from "./bulkForecast/index";

const rootReducer = combineReducers({
  forecast: forecastReducer,
  bulkForecast: bulkForecastReducer,
});

export default rootReducer;
