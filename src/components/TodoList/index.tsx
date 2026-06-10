import styles from './styles.module.scss';
import { TodoItem } from '../index';
import type { Todo } from '../../types';

interface Props {
  todos: Todo[];
  fetchTodos: () => void;
}

export default function TodoList({ todos, fetchTodos }: Props) {
  return (
    <ul className={styles.todolist}>
      {todos.map((item) => {
        return <TodoItem key={item.id} item={item} fetchTodos={fetchTodos} />;
      })}
    </ul>
  );
}
