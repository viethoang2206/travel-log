import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../actions/userAction";

import "./Register.scss";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */
  const onFinish = (values) => {
    dispatch(registerUser(values, navigate));
  };
  return (
    <div className="register-container container">
      <Form
        className="register-form"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <h1>Sign up</h1>
        <Form.Item
          name="firstname"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="First Name *" />
        </Form.Item>
        <Form.Item
          name="lastname"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input placeholder="Last Name *" />
        </Form.Item>
        <Form.Item
          style={{
            width: 300,
          }}
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input placeholder="Email *" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password *" />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password *" />
        </Form.Item>
        <Form.Item
          style={{
            width: 300,
          }}
        >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
