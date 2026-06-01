import styles from './styles.module.scss';
import { TodoItem } from '../index';
import type { Todo } from '../../utils';

interface Props {
  tasks: Todo[];
  fetchTasks: () => void;
}

export default function Tasklist({ tasks, fetchTasks }: Props) {
  return (
    <ul className={styles.tasklist}>
      {tasks.map((item) => {
        return <TodoItem key={item.id} item={item} fetchTasks={fetchTasks} />;
      })}
    </ul>
  );
}
