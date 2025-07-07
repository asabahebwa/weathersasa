import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from "./rootReducer";

export const store = (state = {}) => {
  return configureStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

// Export types for TypeScript
export type RootState = ReturnType<ReturnType<typeof store>['getState']>;
export type AppDispatch = ReturnType<typeof store>['dispatch'];
