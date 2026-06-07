import styles from './styles.module.scss';
import { Checkbox, IconButton, Button } from '../../ui-kit';
import { EditIcon, DeleteIcon } from '../../assets';
import type { Todo } from '../../types';
import { validateTitle } from '../../utils/validateTitle';
import { useState } from 'react';
import { deleteTodo, updateTodo } from '../../api/endpoints/todos';

interface Props {
  item: Todo;
  fetchTasks: () => void;
}

export default function TodoItem({ item: { id, title, isDone }, fetchTasks }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<string>(title);
  const [error, setError] = useState<string>('');

  const displayValue = isEditing ? editValue : title;

  async function handleCheckboxChange(data: Pick<Todo, 'id' | 'title' | 'isDone'>) {
    try {
      await updateTodo(data.id, { title: data.title, isDone: data.isDone });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleTitleChange(data: Pick<Todo, 'id' | 'title' | 'isDone'>) {
    try {
      await updateTodo(data.id, { title: data.title, isDone: data.isDone });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteTask(id: number) {
    try {
      await deleteTodo(id);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  function handleSaveTitle() {
    const validationError = validateTitle(editValue);

    if (validationError) {
      setError(validationError);
      return;
    }

    handleTitleChange({ id, title: editValue, isDone });
    setIsEditing(false);
    setError('');
  }

  function handleStartEdit() {
    setIsEditing(true);
    setEditValue(title);
    setError('');
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setEditValue(title);
    setError('');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setEditValue(newValue);

    const validationError = validateTitle(newValue);
    setError(validationError || '');
  }

  function handleCheckboxClick() {
    if (!isEditing) {
      handleCheckboxChange({ id, title: editValue, isDone: !isDone });
    }
  }

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSaveTitle();
  }

  return (
    <li className={styles.tasklist__item}>
      <form className={styles.tasklist__wrapper} onSubmit={onSubmit}>
        <Checkbox checked={isDone} isEditing={isEditing} onChange={handleCheckboxClick} />
        <input
          type="text"
          className={`${styles.tasklist__title} ${isDone ? styles.checked : ''}`}
          value={displayValue}
          name="title"
          readOnly={!isEditing}
          onChange={handleChange}
        />
        {error && isEditing && <div className={styles.errorMessage}>{error}</div>}
      </form>
      {isEditing ? (
        <Button title="сохранить" color="primary" onClick={handleSaveTitle} />
      ) : (
        <IconButton
          children={<img src={EditIcon} alt="edit" width={12} height={12} />}
          color="primary"
          onClick={handleStartEdit}
        />
      )}
      {isEditing ? (
        <Button title="отмена" color="secondary" onClick={handleCancelEdit} />
      ) : (
        <IconButton
          children={<img src={DeleteIcon} alt="delete" width={12} height={12} />}
          color="secondary"
          onClick={() => handleDeleteTask(id)}
        />
      )}
    </li>
  );
}
