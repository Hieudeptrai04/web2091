import { Table, Button } from "antd";

function Lab2() {

  // bai1
  const columns1 = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Age", dataIndex: "age" },
    { title: "Major", dataIndex: "major" },
  ];

  const data1 = [
    { key: 1, id: 1, name: "Nam", age: 20, major: "dfdfds" },
    { key: 2, id: 2, name: "Linh", age: 21, major: "Busindfdess" },
    { key: 3, id: 3, name: "Hà", age: 19, major: "Design" },
  ];

  // bài 2
  const columns2 = [
    { title: "ID", dataIndex: "id" },
    { title: "Product Name", dataIndex: "name" },
    { title: "Price", dataIndex: "price" },
    { title: "Category", dataIndex: "category" },
  ];

  const data2 = [
    { key: 1, id: 1, name: "Lapto", price: 15000000, category: "Electronics" },
    { key: 2, id: 2, name: "điển chó", price: 500000, category: "Accessories" },
    
  ];

  // Bài 3
  const columns3 = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <span style={{ color: status === "active" ? "green" : "red" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      render: () => (
        <>
          <Button type="primary" style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger>Delete</Button>
        </>
      ),
    },
  ];

  const data3 = [
    { key: 1, id: 1, name: "Nguyen Van Hieu", email: "hieu232@gmail.com", status: "active" },
   
  ];

  return (
    <div style={{ padding: 20 }}>
      
      <h2>Bài 1 - Student List</h2>
      <Table columns={columns1} dataSource={data1} />

      <h2 style={{ marginTop: 40 }}>Bài 2 - Product List</h2>
      <Table columns={columns2} dataSource={data2} pagination={{ pageSize: 3 }} />

      <h2 style={{ marginTop: 40 }}>Bài 3 - User Management</h2>
      <Table columns={columns3} dataSource={data3} />

    </div>
  );
}

export default Lab2;