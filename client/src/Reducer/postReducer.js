import { SUBMIT, GETPOST, DELETEPOST, SAVEEDIT, INC } from "../actions/type";
const newPost = {};
const allPost = [];
const postReducer = (state = allPost, action) => {
  switch (action.type) {
    case SUBMIT:
      const { payload, value } = action;
      console.log(payload);
      return [...state, ...payload];

    case GETPOST:
      const { newTravel } = action;

      return [...newTravel];
    case SAVEEDIT:
      const { post } = action;
      const postID = post.id;
      const { creator, message, title, tag } = post;
      console.log(tag);
      const newTag = tag
        .join()
        .split(",")
        .map((val) => {
          return (val = "#" + val);
        });
      const newState = state.filter((val) => {
        if (val._id === postID) {
          val.creator = creator;
          val.message = message;
          val.title = title;
          val.tags = newTag;
        }
        return val;
      });
      console.log(newState);
      return [...newState];
    case DELETEPOST:
      const { id } = action;
      const delPost = state.filter((val) => val._id !== id);
      return [...delPost];
    case INC:
      const countID = action.id;
      const count = action.newCount;

      const countState = state.filter((val) => {
        if (val._id === countID) {
          val.likeCount = count;
        }
        return val;
      });

      return [...countState];
    default:
      return state;
  }
};
export { postReducer };
