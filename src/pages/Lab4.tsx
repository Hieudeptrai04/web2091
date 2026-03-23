import { Button, Checkbox, Form, Input, Select } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface CategoryFormData {
  title: string;
  description?: string;
  active: boolean;
}

interface Category extends CategoryFormData {
  id: number;
}

interface Story {
  title: string;
  author?: string;
  image?: string;
  description?: string;
  categoryId?: number;
  createdAt?: string;
}

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const Lab4 = () => {
  const [categoryForm] = Form.useForm<CategoryFormData>();
  const [storyForm] = Form.useForm<Story>();

  const { data: categories = [], isLoading: isLoadingCategories, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/categories");
      return res.data as Category[];
    },
  });

  const categoryMutation = useMutation({
    mutationFn: async (data: CategoryFormData) => {
      const res = await axios.post("http://localhost:3000/categories", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Them danh muc thanh cong");
      categoryForm.resetFields();
      refetch();
    },
    onError: () => {
      toast.error("Co loi xay ra");
    },
  });

  const storyMutation = useMutation({
    mutationFn: async (data: Story) => {
      const storyPayload = {
        ...data,
        createdAt: getCurrentDate(),
      };
      const res = await axios.post("http://localhost:3000/stories", storyPayload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Them truyen thanh cong");
      storyForm.resetFields();
    },
    onError: () => {
      toast.error("Co loi xay ra");
    },
  });

  const onCategoryFinish = (values: CategoryFormData) => {
    categoryMutation.mutate(values);
  };

  const onStoryFinish = (values: Story) => {
    storyMutation.mutate(values);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold">Them danh muc truyen</h2>

          <Form
            form={categoryForm}
            layout="vertical"
            initialValues={{ active: false }}
            onFinish={onCategoryFinish}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Vui long nhap title" }]}
            >
              <Input placeholder="Nhap ten danh muc" />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea rows={4} placeholder="Nhap mo ta danh muc" />
            </Form.Item>

            <Form.Item name="active" valuePropName="checked">
              <Checkbox>Active</Checkbox>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={categoryMutation.isPending}
              block
            >
              {categoryMutation.isPending ? "Dang them..." : "Them danh muc"}
            </Button>

            {categoryMutation.isPending && (
              <p className="mt-3 text-center text-sm text-blue-600">Dang them danh muc...</p>
            )}
          </Form>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold">Them truyen moi</h2>

          <Form form={storyForm} layout="vertical" onFinish={onStoryFinish}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Vui long nhap ten truyen" }]}
            >
              <Input placeholder="Nhap ten truyen" />
            </Form.Item>

            <Form.Item label="Author" name="author">
              <Input placeholder="Nhap ten tac gia" />
            </Form.Item>

            <Form.Item label="Image" name="image">
              <Input placeholder="Nhap URL hinh anh" />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea rows={4} placeholder="Nhap mo ta truyen" />
            </Form.Item>

            <Form.Item label="Danh muc" name="categoryId">
              <Select
                placeholder="Chon danh muc"
                loading={isLoadingCategories}
                options={categories.map((category) => ({
                  label: category.title,
                  value: category.id,
                }))}
              />
            </Form.Item>

            <p className="mb-4 text-sm text-gray-500">
              Ngay tao se duoc them tu dong khi ban luu truyen.
            </p>

            <Button type="primary" htmlType="submit" loading={storyMutation.isPending} block>
              {storyMutation.isPending ? "Dang them..." : "Them truyen"}
            </Button>

            {storyMutation.isPending && (
              <p className="mt-3 text-center text-sm text-blue-600">Dang them truyen...</p>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Lab4;
