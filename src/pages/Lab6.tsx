import { Form, Input, Button, Spin, DatePicker } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const Lab6 = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/stories/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        createdAt: data.createdAt ? dayjs(data.createdAt) : null,
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      return axios.patch(`http://localhost:3000/stories/${id}`, values);
    },
    onSuccess: () => {
      toast.success("Cập nhật thành công");
      queryClient.invalidateQueries({ queryKey: ["getAllStories"] });
      navigate("/lab5");
    },
    onError: () => {
      toast.error("Cập nhật thất bại");
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate({
      ...values,
      createdAt: values.createdAt
        ? values.createdAt.toISOString()
        : null,
    });
  };

  if (isLoading) return <Spin />;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 500 }}
      disabled={mutation.isPending}
    >
      <Form.Item
        name="title"
        label="Tên truyện"
        rules={[{ required: true, message: "Nhập tên truyện" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="author"
        label="Tác giả"
        rules={[{ required: true, message: "Nhập tác giả" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="image" label="Link ảnh">
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Mô tả">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Ngày thêm"
        name="createdAt"
        rules={[{ required: true, message: "Chọn ngày" }]}
      >
        <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={mutation.isPending}>
        Cập nhật
      </Button>
    </Form>
  );
};

export default Lab6;