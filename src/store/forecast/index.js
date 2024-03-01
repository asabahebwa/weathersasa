const ADD_FORECAST = "ADD_FORECAST";

const defaultState = {};

export function addForecast(forecast) {
  return {
    type: ADD_FORECAST,
    forecast,
  };
}

export const forecastReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_FORECAST:
      const newState = Object.assign({}, defaultState, action.forecast);
      return newState;
    default:
      return state;
  }
};
