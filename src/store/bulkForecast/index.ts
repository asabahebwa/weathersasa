import { createSlice } from "@reduxjs/toolkit";

// Define the state shape
interface BulkForecastState {
  [key: string]: any;
}

const initialState: BulkForecastState = {};

// Create the slice
const bulkForecastSlice = createSlice({
  name: "bulkForecast",
  initialState,
  reducers: {
    addBulkForecast(state, action) {
      return {
        ...initialState,
        ...action.payload,
      };
    },
  },
});

// Export the action
export const { addBulkForecast } = bulkForecastSlice.actions;

// Export the reducer
export default bulkForecastSlice.reducer;
