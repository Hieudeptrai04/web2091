import { Button, Image, Popconfirm, Space, Spin, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

dayjs.extend(customParseFormat);

interface Story {
  id: number;
  title: string;
  author?: string;
  image?: string;
  description?: string;
  createdAt?: string;
}

const STORY_DATE_FORMATS = ["YYYY-MM-DD", "YYYY/M/D", "DD/MM/YYYY"];

const formatStoryDate = (value?: string) => {
  if (!value) {
    return "-";
  }

  const strictDate = dayjs(value, STORY_DATE_FORMATS, true);
  if (strictDate.isValid()) {
    return strictDate.format("DD/MM/YYYY");
  }

  const fallbackDate = dayjs(value);
  return fallbackDate.isValid() ? fallbackDate.format("DD/MM/YYYY") : value;
};

export default function StoryList() {
  const queryClient = useQueryClient();

  const { data = [], isLoading, isError } = useQuery<Story[]>({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories");
      return res.data;
    },
  });

  const deleteStoryMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/stories/${id}`);
    },
    onSuccess: async () => {
      toast.success("Xoa truyen thanh cong");
      await queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
    onError: () => {
      toast.error("Xoa truyen that bai");
    },
  });

  const columns: TableProps<Story>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "Anh",
      dataIndex: "image",
      render: (url?: string) =>
        url ? <Image src={url} width={60} alt="Story cover" /> : <span>-</span>,
      width: 100,
    },
    {
      title: "Ten truyen",
      dataIndex: "title",
    },
    {
      title: "Tac gia",
      dataIndex: "author",
      render: (author?: string) => author || "-",
    },
    {
      title: "Mo ta",
      dataIndex: "description",
      render: (description?: string) => description || "-",
    },
    {
      title: "Ngay tao",
      dataIndex: "createdAt",
      render: (date?: string) => formatStoryDate(date),
      width: 140,
    },
    {
      title: "Thao tac",
      key: "actions",
      width: 180,
      render: (_: unknown, record: Story) => (
        <Space>
          <Link to={`/edit/${record.id}`}>
            <Button type="primary">Sua</Button>
          </Link>

          <Popconfirm
            title="Ban chac chan muon xoa truyen nay?"
            okText="Xoa"
            cancelText="Huy"
            onConfirm={() => deleteStoryMutation.mutate(record.id)}
          >
            <Button
              danger
              loading={
                deleteStoryMutation.isPending &&
                deleteStoryMutation.variables === record.id
              }
            >
              Xoa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return <p>Loi khi tai du lieu truyen.</p>;
  }

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <Typography.Title level={3} style={{ margin: 0 }}>
          Danh sach truyen
        </Typography.Title>

        <Link to="/add">
          <Button type="primary">Them truyen</Button>
        </Link>
      </div>

      <Table<Story>
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
      />
    </section>
  );
}
