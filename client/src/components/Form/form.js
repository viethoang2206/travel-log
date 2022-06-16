import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import "./form.scss";

import { useDispatch, useSelector } from "react-redux";
import { submit, getPost, saveEditPost } from "../../actions/userAction";

const PostForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  const [baseImage, setBaseImage] = useState("");
  //const getEditState = useSelector((state) => state.editReducer?.editState);
  const getEditPost = useSelector((state) => state.editReducer);

  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (getEditPost.editState) {
      setEdit(getEditPost);
      mapPost();
      //triggerRequire();
    }
  }, [getEditPost.editState]);
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
    const newTag = getEditPost.findPost.tags.join().split("#");
    newTag.shift();
    const displayTag = newTag.map((val) => {
      const result = val.split(",");
      return result[0];
    });
    console.log(displayTag);
    form.setFieldsValue({
      creator: getEditPost.findPost.creator,
      title: getEditPost.findPost.title,
      message: getEditPost.findPost.message,
      tag: displayTag,
    });
  };
  const clearInput = () => {
    document.getElementsByClassName("fileInput")[0].required = true;
    form.setFieldsValue({
      creator: "",
      title: "",
      message: "",
      tag: "",
    });
    const input = (document.getElementsByClassName("fileInput")[0].value =
      null);
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
    const { upload } = values;

    clearInput();
    if (edit) {
      console.log(getEditPost.findPost._id);
      dispatch(saveEditPost({ ...values, id: getEditPost.findPost._id }));
      setEdit(false);
    } else {
      dispatch(submit({ ...values, upload: baseImage }));
    }
  };

  return (
    <Form
      layout={formLayout}
      form={form}
      initialValues={{
        layout: formLayout,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="creator"
        label="Creator"
        rules={[
          {
            required: true,
            message: "Please input creator",
          },
        ]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: "Please input your title",
          },
        ]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        name="message"
        label="Message"
        rules={[
          {
            required: true,
            message: "Please input your message",
          },
        ]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        name="tag"
        label="Tag(coma seperated)"
        rules={[
          {
            required: true,
            message: "Please input your tag",
          },
        ]}
      >
        <Input placeholder="input placeholder" />
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
  );
};

export default PostForm;
