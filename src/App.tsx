import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { Route, Routes } from "react-router-dom";
import Lab1 from "./pages/lab1";
import Lab2 from "./pages/lab2";
import Lab3 from "./pages/lab3";
import Lab4 from "./pages/Lab4";
import Lab5 from "./pages/Lab5";
import Lab6 from "./pages/Lab6";
// const { Header, Content, Footer } = Layout;
function App() {
  // const onFinish = (values: any) => {
  //   console.log(values);
  // };
  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="#" className="text-xl font-semibold">
            <strong>WEB2091 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">
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

      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <div className="mb-2">
          <Link to="/lab1">
            <Button className="mr-1" type="primary">Lab1</Button>
          </Link>

          <Link to="/lab2">
            <Button className="mr-1" type="default">Lab2</Button>
          </Link>

          <Link to="/lab3">
            <Button className="mr-1" type="dashed">Lab3</Button>
          </Link>

          <Link to="/lab4">
            <Button className="mr-1" type="link">Lab4</Button>
          </Link>

          <Link to="/lab5">
            <Button type="text">Lab5</Button>
          </Link>

          <Link to="/lab6">
            <Button type="text">Lab6</Button>
          </Link>
        </div>

        {/* <Layout className="mt-2">
          <Header style={{ color: "white" }}>Header</Header>
          <Content style={{ padding: 20 }}>
          <Form onFinish={onFinish}>
              <Form.Item label="Username" name="username">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Content>
          <Footer>Footer</Footer>
        </Layout> */}

        <Routes>
          <Route path="/lab1" element={<Lab1/>}></Route>
          <Route path="/lab2" element={<Lab2/>}></Route>
          <Route path="/lab3" element={<Lab3/>}></Route>
          <Route path="/lab4" element={<Lab4/>}></Route>
          <Route path="/lab5" element={<Lab5/>}></Route>
          <Route path="/lab6/:id" element={<Lab6 />} />
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;
