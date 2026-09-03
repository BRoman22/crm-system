import styles from './styles.module.scss';
import { Checkbox, Button, Input, Form, notification } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, UndoOutlined } from '@ant-design/icons';
import type { Todo } from '../../types';
import { useState } from 'react';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '../../store/api/todos';
import { TODOS_VALIDATION_TITLE, TODOS_MESSAGES } from '../../constans';

interface Props {
  item: Todo;
}

export default function TodoItem({ item: { id, title, isDone } }: Props) {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  async function handleCheckboxChange(data: Pick<Todo, 'id' | 'title' | 'isDone'>) {
    try {
      await updateTodo({ id: data.id, body: { title: data.title, isDone: data.isDone } });
    } catch (error) {
      console.error(error);
      notification.error({
        title: TODOS_MESSAGES.TITLE,
        description: TODOS_MESSAGES.UPDATE_STATUS,
      });
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error(error);
      notification.error({
        title: TODOS_MESSAGES.TITLE,
        description: TODOS_MESSAGES.DELETE_TODO,
      });
    }
  }

  async function onFinish(values: { title: string; isDone: boolean }) {
    try {
      await updateTodo({ id, body: { title: values.title, isDone: values.isDone } });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      notification.error({
        title: TODOS_MESSAGES.TITLE,
        description: TODOS_MESSAGES.UPDATE_TITLE,
      });
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
          <Input disabled={!isEditing} />
        </Form.Item>
        {isEditing ? (
          <>
            <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>
              сохранить
            </Button>
            <Button
              variant="outlined"
              color="danger"
              htmlType="button"
              onClick={handleCancelEdit}
              icon={<UndoOutlined />}
            >
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
