import { Button, Form, Input, notification } from 'antd';
import { TODOS_VALIDATION_TITLE, TODOS_MESSAGES } from '../../constans';
import { useCreateTodoMutation } from '../../store/api/todos';

export default function AddTodo() {
  const [createTodo] = useCreateTodoMutation();
  const [form] = Form.useForm();
  const onFinish = async (values: { title: string }) => {
    try {
      await createTodo({ title: values.title, isDone: false });
      form.resetFields();
    } catch (error) {
      console.error(error);
      notification.error({
        title: TODOS_MESSAGES.TITLE,
        description: TODOS_MESSAGES.CREATE_TODO,
      });
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
            message: TODOS_VALIDATION_TITLE.REQUIRED_MESSAGE,
          },
          {
            min: TODOS_VALIDATION_TITLE.MIN_LENGTH,
            message: TODOS_VALIDATION_TITLE.MIN_LENGTH_MESSAGE,
          },
          {
            max: TODOS_VALIDATION_TITLE.MAX_LENGTH,
            message: TODOS_VALIDATION_TITLE.MAX_LENGTH_MESSAGE,
          },
          {
            whitespace: true,
            message: TODOS_VALIDATION_TITLE.ONLY_SPACES_MESSAGE,
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
