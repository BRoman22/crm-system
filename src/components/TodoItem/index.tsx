import styles from './styles.module.scss';
import { Checkbox, Button, Input, Form } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Todo } from '../../types';
import { useState } from 'react';
import { deleteTodo, updateTodo } from '../../api/endpoints/todos';
import { VALIDATION_TITLE, ERROR_MESSAGES } from '../../constans';
import { notification } from 'antd';

interface Props {
  item: Todo;
  fetchTodos: () => void;
}

export default function TodoItem({ item: { id, title, isDone }, fetchTodos }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  async function handleCheckboxChange(data: Pick<Todo, 'id' | 'title' | 'isDone'>) {
    try {
      await updateTodo(data.id, { title: data.title, isDone: data.isDone });
    } catch (error) {
      console.error(error);
      notification.error({
        title: ERROR_MESSAGES.TITLE,
        description: ERROR_MESSAGES.UPDATE_STATUS,
      });
    } finally {
      fetchTodos();
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error(error);
      notification.error({
        title: ERROR_MESSAGES.TITLE,
        description: ERROR_MESSAGES.DELETE_TODO,
      });
    } finally {
      fetchTodos();
    }
  }

  async function onFinish(values: { title: string; isDone: boolean }) {
    try {
      await updateTodo(id, { title: values.title, isDone: values.isDone });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      notification.error({
        title: ERROR_MESSAGES.TITLE,
        description: ERROR_MESSAGES.UPDATE_TITLE,
      });
    } finally {
      fetchTodos();
    }
  }

  function handleStartEdit(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    form.resetFields();
  }

  function handleCheckboxClick() {
    handleCheckboxChange({ id, title: title, isDone: !isDone });
  }

  return (
    <li className={styles.todolist__item}>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{ title: title, isDone: isDone }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
        }}
        layout="inline"
      >
        <Form.Item name="isDone" valuePropName="checked">
          <Checkbox disabled={isEditing} onChange={handleCheckboxClick} />
        </Form.Item>
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
          <Input disabled={!isEditing} />
        </Form.Item>
        {isEditing ? (
          <>
            <Button type="primary" htmlType="submit">
              сохранить
            </Button>
            <Button danger type="primary" htmlType="button" onClick={handleCancelEdit}>
              отмена
            </Button>
          </>
        ) : (
          <>
            <Button
              icon={<EditOutlined />}
              type="primary"
              htmlType="button"
              onClick={handleStartEdit}
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              type="primary"
              htmlType="button"
              onClick={() => handleDeleteTodo(id)}
            />
          </>
        )}
      </Form>
    </li>
  );
}
