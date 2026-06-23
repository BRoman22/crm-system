import { Button, Form, Input } from 'antd';
import { VALIDATION_TITLE } from '../../constans';
import { createTodo } from '../../api/endpoints/todos';
import { notification } from 'antd';
import { ERROR_MESSAGES } from '../../constans';

interface Props {
  fetchTodos: () => void;
}

export default function AddTodo({ fetchTodos }: Props) {
  const [form] = Form.useForm();
  const onFinish = async (values: { title: string }) => {
    try {
      await createTodo({ title: values.title, isDone: false });
      form.resetFields();
    } catch (error) {
      console.error(error);
      notification.error({
        title: ERROR_MESSAGES.TITLE,
        description: ERROR_MESSAGES.CREATE_TODO,
      });
    } finally {
      fetchTodos();
    }
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
            message: VALIDATION_TITLE.MIN_LENGTH_MESSAGE,
          },
          {
            max: VALIDATION_TITLE.MAX_LENGTH,
            message: VALIDATION_TITLE.MAX_LENGTH_MESSAGE,
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
