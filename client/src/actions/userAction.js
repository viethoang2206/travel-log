import axios from "axios";
import { SUBMIT, GETPOST, DELETEPOST, EDITPOST, SAVEEDIT, INC } from "./type";

const dateConvert = (array) => {
  const newTravel = array.map((val) => {
    const date = val.createdAt.split("T");
    const mdy = date[0].split("-");
    const newDate = new Date(mdy[0], mdy[1] - 1, mdy[2]);
    const currentDate = new Date();

    const current = Math.round((currentDate - newDate) / (1000 * 60 * 60 * 24));

    return { ...val, createdAt: current };
  });

  return newTravel;
};
const submit = (value) => async (dispatch) => {
  const { creator, title, message, tag, upload } = value;
  console.log(tag);
  const newTag = tag.split(",").map((val) => {
    return (val = "#" + val);
  });

  const post = {
    creator,
    title,
    message,
    tags: newTag,
    selectedFile: upload,
  };

  const response = await axios
    .post("http://localhost:5000/api/v1/travel", post)
    .catch((err) => {
      alert(err);
    })
    .then((res) => {
      return res;
    });

  if (response.data.success) {
    const { newTravel } = response.data;
    const travel = [];

    dispatch({
      type: SUBMIT,
      payload: dateConvert([...travel, newTravel]),
      value,
    });
  } else {
    alert(response.data.message);
  }
};
const getPost = () => async (dispatch) => {
  const url = "http://localhost:5000/api/v1/travel";
  const response = await axios
    .get(url)
    .catch((err) => {
      console.log(err.message);
    })
    .then((res) => {
      const { data } = res;

      if (data.success) {
        const { travel } = data;

        const newTravel = dateConvert(travel);

        dispatch({ type: GETPOST, newTravel });
      }
    });
};
const deletePost = (id) => async (dispatch) => {
  console.log(id);
  const url = "http://localhost:5000/api/v1/travel/" + id;

  const response = await axios
    .delete(url)
    .catch((err) => {
      alert(err);
    })
    .then((res) => {
      if (res.data.success) {
        dispatch({ type: DELETEPOST, id });
      } else {
        alert("fail to delete");
      }
    });
};
const editPost =
  ({ findPost, editState }) =>
  (dispatch) => {
    dispatch({ type: EDITPOST, findPost, editState });
  };
const saveEditPost = (post) => async (dispatch) => {
  console.log(post);
  const id = post.id;
  const url = "http://localhost:5000/api/v1/travel/" + id;
  console.log(post);
  const response = await axios
    .patch(url, post)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      dispatch({ type: SAVEEDIT, post });
    });
};
const incCount = (id, count) => async (dispatch) => {
  const url = "http://localhost:5000/api/v1/travel/inc/" + id;
  const newCount = count + 1;
  await axios
    .patch(url, { count: newCount })
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      if (res.data.success) {
        dispatch({ type: INC, id, newCount });
      }
    });
};
export { submit, getPost, deletePost, editPost, saveEditPost, incCount };
