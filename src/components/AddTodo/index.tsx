import { Button, Form, Input } from 'antd';
import type { Todo } from '../../types';
import { VALIDATION_TITLE } from '../../constans';
import { createTodo } from '../../api/endpoints/todos';

interface Props {
  fetchTodos: () => void;
}

export default function AddTodo({ fetchTodos }: Props) {
  const [form] = Form.useForm();

  async function handleCreateTodo(data: Pick<Todo, 'title' | 'isDone'>) {
    try {
      await createTodo(data);
      fetchTodos();
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  }
  const onFinish = async (values: { title: string }) => {
    await handleCreateTodo({ title: values.title, isDone: false });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={{ display: 'flex', width: '100%' }}
      layout="inline"
    >
      <Form.Item
        name="title"
        style={{ flex: 1 }}
        rules={[
          {
            required: true,
            message: VALIDATION_TITLE.REQUIRED_MESSAGE,
          },
          {
            min: VALIDATION_TITLE.MIN_LENGTH,
            message: VALIDATION_TITLE.MIN_LENGTH_MESSAGE(),
          },
          {
            max: VALIDATION_TITLE.MAX_LENGTH,
            message: VALIDATION_TITLE.MAX_LENGTH_MESSAGE(),
          },
          {
            whitespace: true,
            message: VALIDATION_TITLE.ONLY_SPACES_MESSAGE,
          },
        ]}
      >
        <Input placeholder="Task To Be Done" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </Form>
  );
}
