import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import "./form.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  submit,
  getPost,
  saveEditPost,
  editPost,
} from "../../../actions/userAction";
import { EDITPOST } from "../../../actions/type";
import Search from "../../Search/Search";

const PostForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  const [baseImage, setBaseImage] = useState("");
  //const getEditState = useSelector((state) => state.editReducer?.editState);
  const getEditPost = useSelector((state) => state.editReducer);
  const getCurrentUser = useSelector((state) => state.userReducer);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    console.log(getEditPost.editState);
    if (getEditPost.editState) {
      setEdit(getEditPost);
      mapPost();
      //triggerRequire();
    }
  }, [getEditPost.findPost]);
  // const triggerRequire = () => {
  //   if (edit) {
  //     console.log("cvcv");
  //     document.getElementsByClassName("fileInput")[0].required = false;
  //   } else {
  //     console.log("vcvc");
  //     document.getElementsByClassName("fileInput")[0].required = true;
  //   }
  // };
  const mapPost = () => {
    document.getElementsByClassName("fileInput")[0].required = false;
    // const newTag = getEditPost.findPost.tags.join().split("#");
    // newTag.shift();
    // const displayTag = newTag.map((val) => {
    //   const result = val.split(",");
    //   return result[0];
    // });
    //console.log(displayTag);
    form.setFieldsValue({
      title: getEditPost.findPost.title,
      message: getEditPost.findPost.message,
      tag: getEditPost.findPost.tags,
    });
  };
  const clearInput = () => {
    document.getElementsByClassName("fileInput")[0].required = true;
    form.setFieldsValue({
      title: "",
      message: "",
      tag: "",
    });
    const input = (document.getElementsByClassName("fileInput")[0].value =
      null);
    dispatch(editPost({ findPost: null, editState: false }));
  };
  const uploadImage = async (e) => {
    const file = e.target.files[0];

    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const onFinish = (values) => {
    console.log(values);

    clearInput();
    if (edit) {
      console.log(getEditPost.findPost._id);
      dispatch(
        saveEditPost(
          { ...values, id: getEditPost.findPost._id },
          getEditPost.currentUser
        )
      );
      setEdit(false);
    } else {
      dispatch(
        submit({
          ...values,
          upload: baseImage,
          user: getCurrentUser,
        })
      );
    }
  };

  return (
    <div className="form-container">
      <Form
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Please input your title",
            },
          ]}
        >
          <Input
            style={{
              width: 250,
            }}
            placeholder="Title"
          />
        </Form.Item>
        <Form.Item
          name="message"
          rules={[
            {
              required: true,
              message: "Message",
            },
          ]}
        >
          <Input
            style={{
              width: 250,
            }}
            placeholder="input placeholder"
          />
        </Form.Item>
        <Form.Item
          name="tag"
          rules={[
            {
              required: true,
              message: "Please input your tag",
            },
          ]}
        >
          <Input
            style={{
              width: 250,
            }}
            placeholder="Tag(coma seperated)"
          />
        </Form.Item>

        <input
          className="fileInput"
          required
          type="file"
          onChange={(e) => {
            uploadImage(e);
          }}
        />
        <Form.Item>
          <Button className="btn-adj" type="primary" htmlType="submit">
            {edit ? "Save" : "Submit"}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={clearInput} className="btn-adj" type="primary">
            Clear
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostForm;
