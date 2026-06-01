import styles from './styles.module.scss';
import { Button } from '../../ui-kit';
import { type Todo } from '../../utils';

interface Props {
  name: string;
  createTask: (data: Pick<Todo, 'title' | 'isDone'>) => void;
}

export default function AddTodo({ name, createTask }: Props) {
  function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get(name) as string;
    createTask({ title, isDone: false });
    e.currentTarget.reset();
  }

  return (
    <form className={styles.addTodo} onSubmit={handleFormSubmit} noValidate>
      <input
        className={styles.addTodo__input}
        autoComplete="off"
        name={name}
        placeholder="Task To Be Done..."
      />
      <Button title="Add" extraClassName={styles.button__add} type="submit" />
    </form>
  );
}
