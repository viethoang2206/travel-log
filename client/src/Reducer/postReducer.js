import {
  SUBMIT,
  GETPOST,
  DELETEPOST,
  SAVEEDIT,
  INC,
  GETALLPOST,
  GETTITLE,
  STARTLOADING,
  ENDLOADING,
} from "../actions/type";
const newPost = {};
const allPost = {
  isLoading: true,
  post: [],
};
const postReducer = (state = allPost, action) => {
  switch (action.type) {
    case STARTLOADING:
      return { ...state, isLoading: true };
    case ENDLOADING:
      return { ...state, isLoading: false };
    case GETALLPOST:
      console.log(action.payload);
      return { ...state, post: action.payload };
    case SUBMIT:
      const { payload, value } = action;
      console.log(payload);
      return { ...state, post: payload };

    case GETPOST:
      const { newTravel } = action;

      return { ...state, post: newTravel };
    case SAVEEDIT:
      const { post } = action;
      const postID = post.id;
      const { message, title, tag } = post;
      console.log(tag);
      const newTag = tag
        .join()
        .split(",")
        .map((val) => {
          return (val = "#" + val);
        });
      const newState = state.filter((val) => {
        if (val._id === postID) {
          val.message = message;
          val.title = title;
          val.tags = newTag;
        }
        return val;
      });
      console.log(newState);
      return { ...state, post: newState };
    case DELETEPOST:
      const { id } = action;
      const delPost = state.filter((val) => val._id !== id);
      return { ...state, post: delPost };
    case INC:
      const countID = action.id;
      const count = action.newCount;

      const countState = state.filter((val) => {
        if (val._id === countID) {
          val.likeCount = count;
        }
        return val;
      });

      return { ...state, post: countState };
    case GETTITLE:
      console.log(state);
      console.log(action.post);

      return { ...state, post: action.post };

    default:
      return state;
  }
};
export { postReducer };
