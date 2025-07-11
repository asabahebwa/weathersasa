import { createSlice } from "@reduxjs/toolkit";

// Define the state type
export interface ForecastState {
  [key: string]: any;
}

const initialState: ForecastState = {};

// Create the slice
const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    // @ts-ignore-next-line
    addForecast(state, action) {
      return {
        ...initialState,
        ...action.payload,
      };
    },
  },
});

// Export the generated action
export const { addForecast } = forecastSlice.actions;

// Export the reducer
export default forecastSlice.reducer;
