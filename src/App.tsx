import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { Layout } from "antd";
import { useState } from "react";
const { Header, Content, Footer } = Layout;

function App() {
  const onFinish = (values: any) => {
    console.log(values);
  };

  const [data, setData] = useState<any>(null);

  const onFinishBai4 = (values: any) => {
    console.log(values);
    setData(values);
  };
  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="#" className="text-xl font-semibold">
            <strong>WEB2091 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="#" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="/list" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="#" className="hover:text-gray-200">
              Đăng nhập
            </Link>
            <Link to="#" className="hover:text-gray-200">
              Đăng ký
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB2091</h1>
        <Button type="primary">Click me</Button>
        <Button type="default">Click me</Button>
        <Button type="dashed">Click me</Button>
        <Button type="link">Click me</Button>
        <Button type="text">Click me</Button>


        <Layout>


          <Header style={{ color: "white" }}>Header</Header>
          <Content style={{ padding: 20 }}>
            <h1>Bài 1</h1>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="email" name="email" rules={[{
                required: true,
                message: "không được để trống"
              }]}  >
                <Input />
              </Form.Item>
              <Form.Item label="password" name="password" rules={[{
                required: true,
                message: "không được để trống"
              }]} >
                <Input.Password placeholder="nhập mật khẩu" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  đăng nhập
                </Button>
              </Form.Item>
            </Form>

            <h1>Bài 2</h1>
            <Form layout="vertical" >
              <Form.Item label="name" name="name" rules={[{
                required: true,
                message: "không được để trống"
              }]}  >
                <Input />
              </Form.Item>
              <Form.Item label="phone" name="phone" rules={[{
                required: true,
                message: "không được để trống"
              }]}  >
                <Input />
              </Form.Item>
              <Form.Item label="email" name="email" rules={[{
                required: true,
                message: "email phải đúng định dạng",
              }, {
                type: "email",
                message: "email phải đúng định dạng",
              }]}  >
                <Input />
              </Form.Item>
              <Form.Item label="password" name="password" rules={[{
                required: true,
                message: "không được để trống"
              }, {
                type: "string",
                min: 8,
                message: "phải tối thiểu 8 kí tự"
              }]} >
                <Input.Password placeholder="nhập mật khẩu" />
              </Form.Item>
              <Form.Item label="Confirm Password" name="confirmPassword" rules={[{
                required: true,
                message: "không được để trống"
              }]} >
                <Input.Password placeholder="nhập lại mật khẩu lần nữa" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  gửi
                </Button>
              </Form.Item>
            </Form>

            <h2> bài 3</h2>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="tên sản phẩm" name="tên sản phẩm" rules={[{
                required: true,
                message: "không được để trống"
              }]}  >
                <Input />
              </Form.Item>
              <Form.Item label="price" name="price" rules={[{
                required: true,
                message: "không được để trống"
              }]} >
                <Input.Password placeholder="nhập giá tiền" />
              </Form.Item>
              <Form.Item label="số lượng" name="số lượng" rules={[{
                required: true,
                message: "không được để trống"
              }]}  >
                <Input />
              </Form.Item>
              <Form.Item label="note" name="note" rules={[{
                required: true,
                message: "không được để trống"
              }]}  >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  đăng nhập
                </Button>
              </Form.Item>
            </Form>

            <h2>bài 4</h2>
            <Form layout="vertical" onFinish={onFinishBai4}>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "không được để trống",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Slug"
                name="slug"
                rules={[
                  {
                    required: true,
                    message: "không được để trống",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "không được để trống",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Content"
                name="content"
                rules={[
                  {
                    required: true,
                    message: "không được để trống",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Image URL"
                name="imageUrl"
                rules={[
                  {
                    required: true,
                    message: "không được để trống",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Form.Item>
            </Form>

            {data && (
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <p><strong>Title:</strong> {data.title}</p>
                <p><strong>Slug:</strong> {data.slug}</p>
                <p><strong>Category:</strong> {data.category}</p>
                <p><strong>Content:</strong> {data.content}</p>
                <p><strong>Image URL:</strong> {data.imageUrl}</p>
                <img src={data.imageUrl} alt="" width="200" />
              </div>
            )}



          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </div>

      <Toaster />
    </>
  );
}

export default App;
