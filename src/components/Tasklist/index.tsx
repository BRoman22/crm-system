import styles from './styles.module.scss';
import { TodoItem } from '../index';
import type { MetaResponse, Todo, TodoInfo } from '../../utils';

interface Props {
  tasks: MetaResponse<Todo, TodoInfo>;
  fetchTasks: () => void;
}

export default function Tasklist({ tasks, fetchTasks }: Props) {
  return (
    <ul className={styles.tasklist}>
      {tasks.data.map((item) => {
        return <TodoItem key={item.id} item={item} fetchTasks={fetchTasks} />;
      })}
    </ul>
  );
}
