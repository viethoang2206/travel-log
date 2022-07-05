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
  GETSINGLEPOST,
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
      return { ...state, post: action.payload };
    case SUBMIT:
      const { payload, value } = action;

      return { ...state, post: [...state.post, ...payload] };

    case GETPOST:
      const { newTravel } = action;

      return { ...state, post: newTravel };
    case DELETEPOST:
      const { id } = action;
      const delPost = state.post.filter((val) => val._id !== id);
      return { ...state, post: delPost };
    case INC:
      const countID = action.id;
      const count = action.newCount;

      const countState = state.post.filter((val) => {
        if (val._id === countID) {
          val.likeCount = count;
        }
        return val;
      });

      return { ...state, post: countState };
    case GETTITLE:
      return { ...state, post: action.post };
    case GETSINGLEPOST:
      const { singlePost } = action;
      return { ...state, post: singlePost };
    default:
      return state;
  }
};
export { postReducer };
