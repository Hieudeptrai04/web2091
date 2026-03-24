import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Image, Table, Button, Popconfirm, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";

function Bai1() {
  const qc = useQueryClient();
  const [keyword, setKeyword] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllStories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories");
      return res.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/stories/${id}`);
    },
    onSuccess: () => {
      toast.success("Xóa truyện thành công");
      qc.invalidateQueries({ queryKey: ["getAllStories"] });
    },
  });

  const filteredData = data?.filter((item: any) =>
    item.title?.toLowerCase().includes(keyword.toLowerCase())
  );

  const columns = [
    {
      title: "Tên truyện",
      dataIndex: "title",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (src: string) => <Image src={src} height={100} />,
    },
    {
      title: "Ngày thêm",
      dataIndex: "createdAt",
      render: (date: string) => {
        if (!date) return "";
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      },
    },
    {
      title: "Action",
      render: (_: any, record: any) => (
        <>
      <Popconfirm
        title="Xóa truyện"
        description="Bạn có muốn xóa không"
        okText="Có"
        cancelText="Không"
        onConfirm={() => mutate(record.id)}
      >
        <Button danger style={{ marginRight: 8 }}>
          Delete
        </Button>
      </Popconfirm>

      <Link to={`/lab6/${record.id}`}>
        <Button type="primary">Sửa</Button>
      </Link>
    </>
      ),
    },
  ];

  if (isError) {
    return <div>Có lỗi xảy ra</div>;
  }

  return (
    <>
      <Input
        placeholder="Tìm theo tên truyện..."
        style={{ marginBottom: 16, width: 300 }}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <Table
        columns={columns}
        dataSource={filteredData}
        loading={isLoading}
        rowKey="id"
        pagination={{
          pageSize: 5,
        }}
      />
    </>
  );
}

function Lab5() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-left font-bold">Bài 1</h1>
        <Bai1 />
      </div>
    </div>
  );
}

export default Lab5;