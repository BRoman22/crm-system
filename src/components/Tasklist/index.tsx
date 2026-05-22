import styles from './styles.module.scss';
import { TodoItem } from '../index';
import type { MetaResponse, Todo, TodoInfo, TodoInfoFilters } from '../../utils';
import { validateString } from '../../utils';
import { useState } from 'react';

interface TasklistProps {
  tasks: MetaResponse<Todo, TodoInfo>;
  filter: TodoInfoFilters;
  handleCheckboxChange: (data: Pick<Todo, 'id' | 'title' | 'isDone'>) => void;
  handleDelete: (id: number) => void;
  handleTitleChange: (data: Pick<Todo, 'id' | 'title' | 'isDone'>) => void;
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

  function handleSaveTitle(data: Pick<Todo, 'id' | 'title' | 'isDone'>) {
    const validationError = validateString(data.title);

    if (validationError) {
      return alert(validationError);
    }

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
