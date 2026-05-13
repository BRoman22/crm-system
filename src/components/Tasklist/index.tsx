import styles from './styles.module.scss';
import { TodoItem } from '../index';
import type { TodoDTO, TodoData, TodoFilters } from '../../utils';
import { validateTitle } from '../../utils';
import { useState } from 'react';

interface TasklistProps {
  tasks: TodoDTO;
  filter: TodoFilters;
  handleCheckboxChange: (data: Pick<TodoData, 'id' | 'title' | 'isDone'>) => void;
  handleDelete: (id: number) => void;
  handleTitleChange: (data: Pick<TodoData, 'id' | 'title' | 'isDone'>) => void;
}

export default function Tasklist({
  tasks,
  filter,
  handleCheckboxChange,
  handleDelete,
  handleTitleChange,
}: TasklistProps) {
  const [edit, setEdit] = useState<number | null>(null);
  const [value, setValue] = useState<string>('');

  function handleSaveTitle(data: Pick<TodoData, 'id' | 'title' | 'isDone'>) {
    if (validateTitle(data.title)) return;

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
      <ul className={styles.tasklist}>
        {tasks.data
          .filter(({ isDone }) => filter === 'all' || isDone === (filter === 'completed'))
          .map(({ id, title, isDone }) => {
            const isEditing = edit === id;
            return (
              <TodoItem
                key={id}
                id={id}
                title={title}
                isDone={isDone}
                isEditing={isEditing}
                handleCheckboxChange={handleCheckboxChange}
                handleDelete={handleDelete}
                handleStartEdit={handleStartEdit}
                handleSaveTitle={handleSaveTitle}
                value={value}
                setValue={setValue}
                setEdit={setEdit}
              />
            );
          })}
      </ul>
    </>
  );
}
