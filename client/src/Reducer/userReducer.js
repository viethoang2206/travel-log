import { CLEARUSER, LOGIN, REGISTER } from "../actions/type";

const user = null;

const userReducer = (state = user, action) => {
  switch (action.type) {
    case REGISTER:
      return state;
    case LOGIN:
      const user = action.payload;
      console.log("a");

      return { ...state, ...user };
    case CLEARUSER:
      return action.payload;
    default:
      return state;
  }
};

export { userReducer };
