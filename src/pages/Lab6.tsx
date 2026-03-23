import { Alert, Button, Card, DatePicker, Form, Input, Space, Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { Dayjs } from "dayjs";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

dayjs.extend(customParseFormat);

interface Story {
  id: number;
  title: string;
  author?: string;
  image?: string;
  description?: string;
  createdAt?: string | null;
}

interface StoryFormValues {
  title: string;
  author?: string;
  image?: string;
  description?: string;
  createdAt?: Dayjs | null;
}

const STORY_DATE_FORMATS = ["YYYY-MM-DD", "YYYY/M/D", "DD/MM/YYYY"];

const parseStoryDate = (value?: string | null) => {
  if (!value) {
    return null;
  }

  const strictDate = dayjs(value, STORY_DATE_FORMATS, true);
  if (strictDate.isValid()) {
    return strictDate;
  }

  const fallbackDate = dayjs(value);
  return fallbackDate.isValid() ? fallbackDate : null;
};

const Lab6 = () => {
  const [form] = Form.useForm<StoryFormValues>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const storyId = Number(id);
  const hasValidId = Number.isInteger(storyId) && storyId > 0;

  const {
    data,
    isLoading,
    isError,
  } = useQuery<Story>({
    queryKey: ["story", storyId],
    enabled: hasValidId,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/stories/${storyId}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    form.setFieldsValue({
      ...data,
      createdAt: parseStoryDate(data.createdAt),
    });
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: async (values: StoryFormValues) => {
      if (!hasValidId) {
        throw new Error("Story id is invalid");
      }

      const payload = {
        ...values,
        createdAt: values.createdAt ? values.createdAt.format("YYYY-MM-DD") : null,
      };

      const res = await axios.patch(`http://localhost:3000/stories/${storyId}`, payload);
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Cap nhat thanh cong");
      await queryClient.invalidateQueries({ queryKey: ["stories"] });
      await queryClient.invalidateQueries({ queryKey: ["story", storyId] });
      navigate("/list");
    },
    onError: () => {
      toast.error("Cap nhat that bai");
    },
  });

  const onFinish = (values: StoryFormValues) => {
    mutation.mutate(values);
  };

  if (!hasValidId) {
    return (
      <Card className="mx-auto max-w-2xl">
        <Alert
          type="error"
          showIcon
          message="Khong tim thay id hop le de sua truyen."
        />
        <div className="mt-4">
          <Button onClick={() => navigate("/list")}>Quay lai danh sach</Button>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <Card className="mx-auto max-w-2xl">
        <Alert
          type="error"
          showIcon
          message="Khong tai duoc thong tin truyen."
        />
        <div className="mt-4">
          <Button onClick={() => navigate("/list")}>Quay lai danh sach</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="Cap nhat truyen"
      extra={<Button onClick={() => navigate("/list")}>Quay lai</Button>}
      className="mx-auto max-w-2xl"
    >
      <Form<StoryFormValues>
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={mutation.isPending}
      >
        <Form.Item
          name="title"
          label="Ten truyen"
          rules={[{ required: true, message: "Nhap ten truyen" }]}
        >
          <Input placeholder="Nhap ten truyen" />
        </Form.Item>

        <Form.Item
          name="author"
          label="Tac gia"
          rules={[{ required: true, message: "Nhap ten tac gia" }]}
        >
          <Input placeholder="Nhap ten tac gia" />
        </Form.Item>

        <Form.Item name="image" label="Link anh">
          <Input placeholder="Nhap URL hinh anh" />
        </Form.Item>

        <Form.Item name="description" label="Mo ta">
          <Input.TextArea rows={4} placeholder="Nhap mo ta" />
        </Form.Item>

        <Form.Item
          label="Ngay them"
          name="createdAt"
          rules={[{ required: true, message: "Chon ngay tao" }]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
        </Form.Item>

        <Space>
          <Button type="primary" htmlType="submit" loading={mutation.isPending}>
            Cap nhat
          </Button>
          <Button onClick={() => navigate("/list")}>Huy</Button>
        </Space>
      </Form>
    </Card>
  );
};

export default Lab6;
