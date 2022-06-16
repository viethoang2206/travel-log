import { combineReducers } from "redux";
import { postReducer } from "./postReducer";
import { counterReducer } from "./counterReducer";
import { editReducer } from "./editReducer";
const rootReducer = combineReducers({
  editReducer: editReducer,
  postReducer: postReducer,
});
export default rootReducer;
