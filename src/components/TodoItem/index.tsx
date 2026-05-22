import styles from './styles.module.scss';
import { Checkbox, Button } from '../../ui-kit';
import { EditIcon, DeleteIcon } from '../../assets';
import { type Todo, validateString } from '../../utils';
import { useState } from 'react';

interface TodoItemProps {
  item: {
    id: number;
    title: string;
    isDone: boolean;
  };
  handleCheckboxChange: (data: Pick<Todo, 'id' | 'title' | 'isDone'>) => void;
  handleDelete: (id: number) => void;
  handleTitleChange: (data: Pick<Todo, 'id' | 'title' | 'isDone'>) => void;
}

export default function TodoItem({
  item: { id, title, isDone },
  handleCheckboxChange,
  handleDelete,
  handleTitleChange,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<string>(title);
  const [error, setError] = useState<string>('');

  const displayValue = isEditing ? editValue : title;

  function handleSaveTitle() {
    const validationError = validateString(editValue);

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

    const validationError = validateString(newValue);
    setError(validationError || '');
  }

  function handleCheckboxClick() {
    if (!isEditing) {
      handleCheckboxChange({ id, title: editValue, isDone: !isDone });
    }
  }

  return (
    <li className={styles.tasklist__item}>
      <div className={styles.tasklist__wrapper}>
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
      </div>
      <Button
        title={isEditing ? 'сохранить' : <img src={EditIcon} alt="edit" width={12} height={12} />}
        extraClassName={styles.button__edit}
        onClick={isEditing ? handleSaveTitle : handleStartEdit}
      />
      <Button
        title={isEditing ? 'отмена' : <img src={DeleteIcon} alt="delete" width={12} height={12} />}
        extraClassName={styles.button__delete}
        onClick={isEditing ? handleCancelEdit : () => handleDelete(id)}
      />
    </li>
  );
}
