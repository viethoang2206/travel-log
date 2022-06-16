import { EDITPOST } from "../actions/type";
const post = {};
const editReducer = (state = post, action) => {
  switch (action.type) {
    case EDITPOST:
      const { findPost, editState } = action;
      console.log(findPost);
      return { ...post, findPost, editState };
    default:
      return { ...post };
  }
};
export { editReducer };
