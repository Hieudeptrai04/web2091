import { Table } from "antd";

// Bài 1
function Bai1(){
    const columns = [
        {
          title: "ID",
          dataIndex: "id",
        },
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Age",
          dataIndex: "age",
        },
        {
          title: "Major",
          dataIndex: "major",
        }
    ];

    const data = [
        {
          key: 1,
          id: 1,
          name: "Minh",
          age: 22,
          major: "IT"
        },
        {
          key: 2,
          id: 2,
          name: "Lan",
          age: 20,
          major: "Marketing"
        },
        {
          key: 3,
          id: 3,
          name: "Tuấn",
          age: 21,
          major: "Design"
        },
    ];
    
    return (
        <Table columns={columns} dataSource={data} pagination={false}/>
    );
}

// Bài 2
function Bai2(){
    const columns = [
        {
          title: "ID",
          dataIndex: "id",
        },
        {
          title: "Product Name",
          dataIndex: "productName",
        },
        {
          title: "Price",
          dataIndex: "price",
        },
        {
          title: "Category",
          dataIndex: "category",
        }
    ];

    const data = [
        {
          key: 1,
          id: 1,
          productName: "Samsung Galaxy S25",
          price: 21000000,
          category: "Điện thoại"
        },
        {
          key: 2,
          id: 2,
          productName: "Macbook Air M3",
          price: 32000000,
          category: "Laptop"
        },
        {
          key: 3,
          id: 3,
          productName: "Tai nghe Sony WH-1000XM5",
          price: 8000000,
          category: "Phụ kiện"
        },
        {
          key: 4,
          id: 4,
          productName: "iPad Air 2025",
          price: 19000000,
          category: "Tablet"
        },
        {
          key: 5,
          id: 5,
          productName: "Chuột Logitech MX Master 3",
          price: 2500000,
          category: "Phụ kiện"
        },
    ];
    
    return (
        <Table columns={columns} dataSource={data} pagination={{pageSize:3}}/>
    );
}
function Bai3() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
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
          <button className="px-3 py-1 mr-1 text-white bg-blue-500 inline-block rounded">Edit</button>
          <button className="px-3 py-1 text-white bg-red-500 inline-block rounded">Del</button>
        </>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      id: 1,
      name: "iPhone 17",
      email: "hieunv@example.com",
      status: "active",
    },
    {
      key: 2,
      id: 2,
      name: "iPhone 17 Pro Max",
      email: "hieunv@example.com",
      status: "inactive",
    },
  ];

  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  );
}


function Lab2() {
    return (
      <div className="space-y-10">

        <div>
          <h1 className="text-left font-bold">Bài 1</h1>
          <Bai1/>
        </div>

        <div>
          <h1 className="text-left font-bold">Bài 2</h1>
          <Bai2/>
        </div>
        
        <div>
          <h1 className="text-left font-bold">Bài 3</h1>
          <Bai3/>
        </div>

      </div>
    );
}

export default Lab2;
