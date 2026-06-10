import { Button, Form, Input } from 'antd';
import type { Todo } from '../../types';
import { validateTitle } from '../../utils/validateTitle';
import { createTodo } from '../../api/endpoints/todos';

interface Props {
  fetchTasks: () => void;
}

export default function AddTodo({ fetchTasks }: Props) {
  const [form] = Form.useForm();

  async function handleCreateTask(data: Pick<Todo, 'title' | 'isDone'>) {
    try {
      await createTodo(data);
      fetchTasks();
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  }
  const onFinish = async (values: { title: string }) => {
    await handleCreateTask({ title: values.title, isDone: false });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={{ display: 'flex', width: '100%' }}
      layout="inline"
    >
      <Form.Item name="title" style={{ flex: 1 }} rules={[{ validator: validateTitle }]}>
        <Input placeholder="Task To Be Done" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </Form>
  );
}
