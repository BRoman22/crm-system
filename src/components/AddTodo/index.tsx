import styles from './styles.module.scss';
import { Button } from '../../ui-kit';
import type { Todo } from '../../types';
import { validateTitle } from '../../utils/validateTitle';
import { createTodo } from '../../api/endpoints/todos';
import { useState } from 'react';

interface Props {
  fetchTasks: () => void;
}

export default function AddTodo({ fetchTasks }: Props) {
  const [title, setTitle] = useState<string>('');

  async function handleCreateTask(data: Pick<Todo, 'title' | 'isDone'>) {
    try {
      await createTodo(data);
      fetchTasks();
      setTitle('');
    } catch (error) {
      console.error(error);
    }
  }

  function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationError = validateTitle(title);

    if (validationError) {
      alert(validationError);
      return;
    }

    handleCreateTask({ title, isDone: false });
  }

  return (
    <form className={styles.addTodo} onSubmit={handleFormSubmit} noValidate>
      <input
        className={styles.addTodo__input}
        autoComplete="off"
        name={'name'}
        placeholder="Task To Be Done..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button title="Add" color="primary" type="submit" />
    </form>
  );
}
