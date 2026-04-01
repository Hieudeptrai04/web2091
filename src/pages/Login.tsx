import { useMutation } from "@tanstack/react-query";
import { Button, Card, Form, Input, message, Typography } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthUser, useAuthStore } from "../store/useAuthStore";

type LoginValues = {
  email: string;
  password: string;
};

type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: LoginValues) => {
      const { data } = await axios.post<AuthResponse>(
        "http://localhost:3000/login",
        values
      );
      return data;
    },
    onSuccess: (data) => {
      setUser({ user: data.user, token: data.accessToken });
      message.success("Dang nhap thanh cong");
      navigate("/");
    },
    onError: () => {
      message.error("Sai email hoac password");
    },
  });

  const onFinish = (values: LoginValues) => {
    mutate(values);
  };

  return (
    <Card className="mx-auto max-w-md text-left">
      <Typography.Title level={2}>Login</Typography.Title>
      <Form layout="vertical" onFinish={onFinish} disabled={isPending}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Nhap email" },
            { type: "email", message: "Email khong hop le" },
          ]}
        >
          <Input placeholder="admin@gmail.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Nhap password" }]}
        >
          <Input.Password placeholder="Nhap password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isPending} block>
          Dang nhap
        </Button>
      </Form>

      <div className="mt-4 text-center">
        Chua co tai khoan? <Link to="/register">Dang ky</Link>
      </div>
    </Card>
  );
};

export default Login;
