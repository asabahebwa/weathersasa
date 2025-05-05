const ADD_BULK_FORECAST = "ADD_BULK_FORECAST";

const defaultState = {};

export function addBulkForecast(bulkForecast) {
  return {
    type: ADD_BULK_FORECAST,
    bulkForecast,
  };
}

export const bulkForecastReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_BULK_FORECAST:
      const newState = Object.assign({}, defaultState, action.bulkForecast);
      return newState;
    default:
      return state;
  }
};
