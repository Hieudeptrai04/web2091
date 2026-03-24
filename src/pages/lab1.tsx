import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button, Layout, Input, Form, Table, Modal } from "antd";

const { Header, Sider, Content } = Layout;

function Dashboard() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  const data = [
    {
      key: 1,
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      role: "Admin",
    },
  ];

  return (
    <>
      <Toaster />

      <Layout style={{ minHeight: "100vh" }}>

        <Sider>
          <h3 style={{ color: "white", padding: 20 }}>Menu</h3>
          <Link to="/" style={{ color: "white", padding: 20, display: "block" }}>
            Dashboard
          </Link>
        </Sider>

        <Layout>

          <Header style={{ background: "#fff" }}>
            <h2>Dashboard</h2>
          </Header>

          <Content style={{ padding: 20 }}>

            <h2>Form đăng ký</h2>

            <Form layout="vertical">
              <Form.Item label="Name">
                <Input />
              </Form.Item>

              <Form.Item label="Email">
                <Input />
              </Form.Item>

              <Form.Item label="Password">
                <Input.Password />
              </Form.Item>

              <Button type="primary">Submit</Button>
            </Form>

            <br />

            <Button type="primary">
              Thêm User
            </Button>

            <br />
            <br />

            <Table columns={columns} dataSource={data} />

            <Modal title="Thêm User" open={false} footer={null}>
              <Form layout="vertical">
                <Form.Item label="Name">
                  <Input />
                </Form.Item>

                <Form.Item label="Email">
                  <Input />
                </Form.Item>

                <Form.Item label="Role">
                  <Input />
                </Form.Item>

                <Button type="primary">Add</Button>
              </Form>
            </Modal>

          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Dashboard;