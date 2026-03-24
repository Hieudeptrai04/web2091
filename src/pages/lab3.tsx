import { Form, Input, Button, Select } from "antd";
import { useState } from "react";

function Bai1() {
  const onFinish = (values: any) => {
    console.log("Login data:", values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400 }}>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email" },
          { type: "email", message: "Email không hợp lệ" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập password" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
}

function Bai2() {
  const onFinish = (values: any) => {
    console.log("Register data:", values);
  };
  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 500 }}>
      <Form.Item label="Họ và tên" name="name">
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email" },
          { type: "email", message: "Email chưa đúng định dạng" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Số điện thoại" name="phone">
        <Input />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          { required: true, message: "Vui lòng nhập mật khẩu" },
          { min: 6, message: "Password có ít nhất 6 ký tự" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Nhập lại mật khẩu"
        name="confirmPass"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Vui lòng nhập lại mật khẩu" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu nhập lại không khớp"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
}

function Bai3() {
  const onFinish = (values: any) => {
    console.log("Product data:", values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 500 }}>
      <Form.Item label="Tên sản phẩm" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="Giá" name="price">
        <Input />
      </Form.Item>

      <Form.Item label="Số lượng" name="quantity">
        <Input />
      </Form.Item>

      <Form.Item label="Mô tả" name="description">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm sản phẩm
        </Button>
      </Form.Item>
    </Form>
  );
}

function Bai4() {
  const [blog, setBlog] = useState<any>(null);

  const onFinish = (values: any) => {
    setBlog(values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 500 }}>
      {JSON.stringify(blog)}

      <Form.Item label="Tên bài viết" name="title">
        <Input />
      </Form.Item>

      <Form.Item label="Tác giả" name="slug">
        <Input />
      </Form.Item>

      <Form.Item label="Danh mục" name="category">
        <Select
          options={[
            { value: "1", label: "Phim ma" },
            { value: "2", label: "Kinh dị" },
          ]}
        />
      </Form.Item>

      <Form.Item label="Nội dung" name="content">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Ảnh bìa" name="image">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng bài
        </Button>
      </Form.Item>
    </Form>
  );
}

function Lab3() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-left font-bold">Bài 1</h1>
        <Bai1 />
      </div>

      <div>
        <h1 className="text-left font-bold">Bài 2</h1>
        <Bai2 />
      </div>

      <div>
        <h1 className="text-left font-bold">Bài 3</h1>
        <Bai3 />
      </div>

      <div>
        <h1 className="text-left font-bold">Bài 4</h1>
        <Bai4 />
      </div>
    </div>
  );
}

export default Lab3;
