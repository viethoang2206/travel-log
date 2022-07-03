import { EDITPOST } from "../actions/type";
const post = {};
const editReducer = (state = post, action) => {
  switch (action.type) {
    case EDITPOST:
      const { findPost, editState, currentUser } = action;
      console.log(findPost);
      return { ...post, findPost, editState, currentUser };
    default:
      return { ...post };
  }
};
export { editReducer };
