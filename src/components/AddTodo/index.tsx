import styles from './styles.module.scss';
import { Button } from '../../ui-kit';
import { type Todo, validateString } from '../../utils';
import { taskApi } from '../../api';
import { useState } from 'react';

interface Props {
  fetchTasks: () => void;
}

export default function AddTodo({ fetchTasks }: Props) {
  const [title, setTitle] = useState<string>('');
  async function handleCreateTask(data: Pick<Todo, 'title' | 'isDone'>) {
    const validationError = validateString(data.title);

    if (validationError) {
      return alert(validationError);
    }

    try {
      await taskApi.createTask(data);
      fetchTasks();
      setTitle('');
    } catch (error) {
      console.error(error);
    }
  }

  function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const title = formData.get('name') as string;
    handleCreateTask({ title, isDone: false });
    e.currentTarget.reset();
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
