import styles from './styles.module.scss';
import { Checkbox, Button, Input, Form } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Todo } from '../../types';
import { useState } from 'react';
import { deleteTodo, updateTodo } from '../../api/endpoints/todos';
import { VALIDATION_TITLE } from '../../constans';

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
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleTitleChange(data: Pick<Todo, 'id' | 'title' | 'isDone'>) {
    try {
      await updateTodo(data.id, { title: data.title, isDone: data.isDone });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSaveTitle() {
    try {
      const values = await form.validateFields();
      await handleTitleChange({ id, title: values.title, isDone });
      setIsEditing(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  }

  function handleStartEdit() {
    setIsEditing(true);
    form.setFieldsValue({ title });
  }

  function handleCancelEdit() {
    setIsEditing(false);
    form.setFieldsValue({ title });
  }

  function handleCheckboxClick() {
    handleCheckboxChange({ id, title: title, isDone: !isDone });
  }

  return (
    <li className={styles.todolist__item}>
      <Form
        form={form}
        initialValues={{ title: title, checkbox: isDone }}
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '16px 1fr auto auto',
          gap: '8px',
        }}
        layout="inline"
      >
        <Form.Item name="checkbox" valuePropName="checked">
          <Checkbox disabled={isEditing} onChange={handleCheckboxClick} />
        </Form.Item>
        <Form.Item
          name="title"
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
          <Button type="primary" htmlType="submit" onClick={handleSaveTitle}>
            сохранить
          </Button>
        ) : (
          <Button
            icon={<EditOutlined />}
            type="primary"
            htmlType="button"
            onClick={handleStartEdit}
          />
        )}
        {isEditing ? (
          <Button danger type="primary" htmlType="button" onClick={handleCancelEdit}>
            отмена
          </Button>
        ) : (
          <Button
            danger
            icon={<DeleteOutlined />}
            type="primary"
            htmlType="button"
            onClick={() => handleDeleteTodo(id)}
          />
        )}
      </Form>
    </li>
  );
}
