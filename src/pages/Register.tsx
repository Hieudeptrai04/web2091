import { useMutation } from "@tanstack/react-query";
import { Button, Card, Form, Input, message, Typography } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthUser, useAuthStore } from "../store/useAuthStore";

type RegisterValues = {
  username: string;
  email: string;
  password: string;
};

type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

const Register = () => {
  const [form] = Form.useForm<RegisterValues>();
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: RegisterValues) => {
      const { data } = await axios.post<AuthResponse>(
        "http://localhost:3000/register",
        values
      );
      return data;
    },
    onSuccess: (data) => {
      setUser({ user: data.user, token: data.accessToken });
      message.success("Dang ky thanh cong");
      form.resetFields();
      navigate("/");
    },
    onError: () => {
      message.error("Dang ky that bai");
    },
  });

  const onFinish = (values: RegisterValues) => {
    mutate(values);
  };

  return (
    <Card className="mx-auto max-w-md text-left">
      <Typography.Title level={2}>Register</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={isPending}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Nhap username" }]}
        >
          <Input placeholder="Nhap username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Nhap email" },
            { type: "email", message: "Email khong hop le" },
          ]}
        >
          <Input placeholder="Nhap email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Nhap password" },
            { min: 6, message: "Password toi thieu 6 ky tu" },
          ]}
        >
          <Input.Password placeholder="Nhap password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isPending} block>
          Dang ky
        </Button>
      </Form>

      <div className="mt-4 text-center">
         <Link to="/login">Dang nhap</Link>
      </div>
    </Card>
  );
};

export default Register;
