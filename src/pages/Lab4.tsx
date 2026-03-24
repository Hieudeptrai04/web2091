import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Checkbox, Select,DatePicker } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

interface Story {
  title: string;
  author?: string;
  active?: boolean;
  image?: string;
  categoryId?: number;
  createdAt?: string;
}

interface Category {
  id: number;
  title: string;
}

function Bai1() {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (values: any) => {
      await axios.post("http://localhost:3000/categories", values);
    },
    onError: () => {
      toast.error("Có lỗi xảy ra rồi anh yêu");
    },
    onSuccess: () => {
      toast.success("Thêm thành công rùi anh yêu");
    },
  });

  const onFinish = (values: any) => {
    mutate(values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 500 }}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Nhập Title" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item name="active" valuePropName="checked">
        <Checkbox>Active</Checkbox>
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={isPending}>
        Submit
      </Button>

      {isSuccess && <p style={{ color: "green" }}>Thêm thành công</p>}
    </Form>
  );
}

function Bai2() {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (values: Story) => {
      await axios.post("http://localhost:3000/categories", values);
    },
    onError: () => {
      toast.error("Có lỗi xảy ra rồi anh yêu");
    },
    onSuccess: () => {
      toast.success("Thêm thành công rùi anh yêu");
    },
  });

  const onFinish = (values: Story) => {
    mutate(values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 500 }}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Nhập Title" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item name="active" valuePropName="checked">
        <Checkbox>Active</Checkbox>
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={isPending}>
        Submit
      </Button>

      {isSuccess && <p style={{ color: "green" }}>Thêm thành công</p>}
    </Form>
  );
}

function Bai4() {
  const qc = useQueryClient();

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/categories");
      return res.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: Story) => {
      await axios.post("http://localhost:3000/stories", values);
    },
    onSuccess: () => {
      toast.success("Thêm truyện thành công yêu ơi");
      qc.invalidateQueries({ queryKey: ["getAllStories"] });
    },
    onError: () => {
      toast.error("lỗi thật rồi");
    },
  });

  const onFinish = (values: any) => {
    mutate({
      ...values,
      createdAt: values.createdAt
        ? values.createdAt.toISOString()
        : new Date().toISOString(),
    });
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 500 }}>
      <Form.Item
        label="Tên truyện"
        name="title"
        rules={[{ required: true, message: "Nhập tên truyện" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Tác giả"
        name="author"
        rules={[{ required: true, message: "Nhập tác giả" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Link ảnh" name="image">
        <Input placeholder="Nhập URL ảnh" />
      </Form.Item>

      <Form.Item label="Danh mục" name="categoryId">
        <Select
          placeholder="Chọn danh mục"
          options={data?.map((item: Category) => ({
            value: item.id,
            label: item.title,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Ngày thêm"
        name="createdAt"
        rules={[{ required: true, message: "Chọn ngày" }]}
      >
        <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={isPending}>
        Thêm truyện
      </Button>
    </Form>
  );
}

function Lab4() {
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
        <h1 className="text-left font-bold">Bài 4</h1>
        <Bai4 />
      </div>
    </div>
  );
}

export default Lab4;