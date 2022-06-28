import { combineReducers } from "redux";
import { postReducer } from "./postReducer";
import { counterReducer } from "./counterReducer";
import { editReducer } from "./editReducer";
import { userReducer } from "./userReducer";
const rootReducer = combineReducers({
  editReducer: editReducer,
  postReducer: postReducer,
  userReducer: userReducer,
});
export default rootReducer;
