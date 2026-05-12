import styles from './styles.module.scss';
import { Checkbox, Button } from '../../ui-kit';
import type { TodoDTO, TodoData, TodoKeys } from '../../utils';
import { validateTitle } from '../../utils';
import EditIcon from '../../assets/icons/edit.svg';
import DeleteIcon from '../../assets/icons/trashcan.svg';
import { useState } from 'react';
import { TodoStatusFilter } from '../index';

interface TasklistProps {
  tasks: TodoDTO | null;
  filter: TodoKeys;
  setFilter: (value: TodoKeys) => void;
  handleCheckboxChange: (data: Pick<TodoData, 'id' | 'title' | 'isDone'>) => void;
  handleDelete: (id: number) => void;
  handleTitleChange: (data: Pick<TodoData, 'id' | 'title' | 'isDone'>) => void;
}

export default function Tasklist({
  tasks,
  filter,
  setFilter,
  handleCheckboxChange,
  handleDelete,
  handleTitleChange,
}: TasklistProps) {
  const [edit, setEdit] = useState<number | null>(null);
  const [value, setValue] = useState<string>('');

  function handleSaveTitle(data: Pick<TodoData, 'id' | 'title' | 'isDone'>) {
    validateTitle(data.title);

    handleTitleChange(data);
    setEdit(null);
    setValue('');
  }

  function handleStartEdit(id: number, currentTitle: string) {
    setEdit(id);
    setValue(currentTitle);
  }

  return (
    <>
      <TodoStatusFilter status={tasks.info} filter={filter} setFilter={setFilter} />
      <ul className={styles.tasklist}>
        {tasks?.data
          .filter(({ isDone }) => filter === 'all' || isDone === (filter === 'completed'))
          .map(({ id, title, isDone }) => {
            const isEditing = edit === id;
            return (
              <li key={id}>
                <Checkbox
                  value={isEditing ? value : title}
                  setValue={setValue}
                  checked={isDone}
                  onChange={() => handleCheckboxChange({ id, title, isDone: !isDone })}
                  isEditing={isEditing}
                  name="title"
                />
                <Button
                  title={
                    isEditing ? (
                      'сохранить'
                    ) : (
                      <img src={EditIcon} alt="edit" width={12} height={12} />
                    )
                  }
                  extraClassName={styles.button__edit}
                  onClick={() =>
                    isEditing
                      ? handleSaveTitle({ id, title: value, isDone })
                      : handleStartEdit(id, title)
                  }
                />
                <Button
                  title={
                    isEditing ? (
                      'отмена'
                    ) : (
                      <img src={DeleteIcon} alt="edit" width={12} height={12} />
                    )
                  }
                  extraClassName={styles.button__delete}
                  onClick={() => (isEditing ? setEdit(null) : handleDelete(id))}
                />
              </li>
            );
          })}
      </ul>
    </>
  );
}
