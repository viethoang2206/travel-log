import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Register from "../components/Content/Register/Register";
import {
  SUBMIT,
  GETPOST,
  DELETEPOST,
  EDITPOST,
  SAVEEDIT,
  INC,
  API_TRAVEL,
  API_USER,
  REGISTER,
  LOGIN,
  GETALLPOST,
  CLEARUSER,
  GETTITLE,
  STARTLOADING,
  ENDLOADING,
} from "./type";

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
const getAllPost = () => async (dispatch) => {
  const url = API_TRAVEL;
  dispatch(startLoading());
  const response = await axios
    .get(url)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: GETALLPOST, payload: dateConvert(res.data.travel) });
      dispatch(endLoading());
      return res;
    });
};
const submit = (value) => async (dispatch) => {
  console.log(value);
  const { creator, title, message, tag, upload, user } = value;
  const { _id, lastname, firstname } = user;
  console.log(tag);
  const newTag = tag.split(",").map((val) => {
    return (val = "#" + val);
  });
  const token = localStorage.getItem("token");
  const post = {
    user: _id,
    creator: `${lastname} ${firstname}`,
    title,
    message,
    tags: newTag,
    selectedFile: upload,
  };

  const response = await axios
    .post(API_TRAVEL, post, {
      headers: { Authorization: `Bearer ${token}` },
    })
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
const getPost = (currentUser) => async (dispatch) => {
  const url = `${API_TRAVEL}/${currentUser._id}`;
  dispatch(startLoading());
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
        dispatch(endLoading());
      }
    });
};
const deletePost = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const url = `${API_TRAVEL}/${id}`;
  dispatch(startLoading());
  const response = await axios
    .delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => {
      alert(err);
    })
    .then((res) => {
      if (res.data.success) {
        dispatch({ type: DELETEPOST, id });
        dispatch(endLoading());
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
  const token = localStorage.getItem("token");
  const id = post.id;
  const url = `${API_TRAVEL}/${id}`;
  console.log(post);
  const response = await axios
    .patch(url, post, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      dispatch({ type: SAVEEDIT, post });
    });
};
const incCount = (id, count) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const url = `${API_TRAVEL}/${id}`;
  const newCount = count + 1;
  await axios
    .patch(
      url,
      { count: newCount },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      if (res.data.success) {
        dispatch({ type: INC, id, newCount });
      }
    });
};
const registerUser = (values, navigate) => async (dispatch) => {
  const { email, password, lastname, firstname } = values;
  const data = {
    lastname,
    firstname,
    username: email,
    password,
  };

  const response = await axios.post(API_USER, data).catch((err) => {
    console.log(err);
  });
  if (response.data.success) {
    navigate("/login");
    dispatch({ type: REGISTER });
  } else {
    alert(response.data.message);
  }
};
const login = (values, navigate) => async (dispatch) => {
  const { username, passowrd } = values;
  console.log(values);
  const response = await axios
    .post(`${API_USER}/login`, values)
    .catch((err) => {
      alert(err);
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem("token", res.data.token);

      if (res.data.success) {
        dispatch({ type: LOGIN, payload: res.data.data });

        navigate("/content");
      }
      return res;
    });
};
const clearUser = () => (dispatch) => {
  console.log("chim clear");
  dispatch({ type: CLEARUSER, payload: null });
};
const getSearch = (value) => async (dispatch) => {
  console.log(value);
  const url = `${API_TRAVEL}/post/search?searchQuery=${value}`;
  console.log(url);
  const resposne = await axios
    .get(url)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      dispatch({ type: GETTITLE, post: dateConvert(res.data.message) });
      console.log(res);
    });
};
const startLoading = () => (dispatch) => {
  dispatch({ type: STARTLOADING });
};
const endLoading = () => (dispatch) => {
  dispatch({ type: ENDLOADING });
};
export {
  endLoading,
  startLoading,
  getSearch,
  registerUser,
  submit,
  getPost,
  deletePost,
  editPost,
  saveEditPost,
  incCount,
  login,
  getAllPost,
  clearUser,
};
