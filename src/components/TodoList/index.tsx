import styles from './styles.module.scss';
import { TodoItem } from '../index';
import type { Todo } from '../../types';

interface Props {
  tasks: Todo[];
  fetchTasks: () => void;
}

export default function TodoList({ tasks, fetchTasks }: Props) {
  return (
    <ul className={styles.todolist}>
      {tasks.map((item) => {
        return <TodoItem key={item.id} item={item} fetchTasks={fetchTasks} />;
      })}
    </ul>
  );
}
