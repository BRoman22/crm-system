import styles from './styles.module.scss';
import { Button } from '../../ui-kit';
import { type TodoData } from '../../utils';

interface SearchbarProps {
  name: string;
  createTask: (data: Pick<TodoData, 'title' | 'isDone'>) => void;
}

export default function Searchbar({ name, createTask }: SearchbarProps) {
  function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get(name) as string;
    createTask({ title, isDone: false });
    e.currentTarget.reset();
  }

  return (
    <form className={styles.searchbar} onSubmit={handleFormSubmit} noValidate>
      <input
        className={styles.searchbar__input}
        autoComplete="off"
        name={name}
        placeholder="Task To Be Done..."
      />
      <Button title="Add" extraClassName={styles.button__add} type="submit" />
    </form>
  );
}
