import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../actions/userAction";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.scss";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    const { username, password } = values;
    if (username && password) {
      dispatch(login(values, navigate));
    }
  };
  return (
    <div className="login-container container">
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <h1>Sign in</h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
        <div className="register-nav">
          <p>DON'T HAVE AN ACCOUNT ? </p>
          <button className="reg" onClick={() => navigate("/register")}>
            SIGN UP
          </button>
        </div>
      </Form>
    </div>
  );
};
export default Login;
