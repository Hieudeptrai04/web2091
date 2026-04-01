import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button, ConfigProvider} from "antd";
import { Route, Routes } from "react-router-dom";
import Lab1 from "./pages/lab1";
import Lab2 from "./pages/lab2";
import Lab3 from "./pages/lab3";
import Lab4 from "./pages/lab4";
import Lab5 from "./pages/lab5";
import Lab6 from "./pages/lab6";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Header";
import {theme as antdTheme } from "antd";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";

// const { Header, Content, Footer } = Layout;
function App() {
  // const onFinish = (values: any) => {
  //   console.log(values);
  // };
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme } = context;
  return (
    <>
      <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}>
      <Navbar/>
      {/* MAIN CONTENT */}
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

          <Link to="/thl4">
            <Button className="mr-1" type="link">Lab4 TH</Button>
          </Link>

          <Link to="/lab5">
            <Button type="text">Lab5</Button>
          </Link>

          <Link to="/thl5">
            <Button type="text">Lab5 TH</Button>
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
          <Route path="/" element={<Lab1/>}></Route>
          <Route path="/lab1" element={<Lab1/>}></Route>
          <Route path="/lab2" element={<Lab2/>}></Route>
          <Route path="/lab3" element={<Lab3/>}></Route>
          <Route path="/lab4" element={<Lab4/>}></Route>
          <Route path="/lab5" element={<Lab5/>}></Route>
          <Route path="/lab6/:id" element={<Lab6 />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>

      <Toaster />
      </ConfigProvider>
    </>
  );
}

export default App;
