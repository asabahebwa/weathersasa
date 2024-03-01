const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const defaultState = {
  username: "",
};
export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      const newState = Object.assign({}, defaultState, action.user);
      return newState;
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
};
