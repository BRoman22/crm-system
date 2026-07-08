import styles from './styles.module.scss';
import { TodoItem } from '../index';
import type { Todo } from '../../types';

interface Props {
  todos: Todo[];
}

export default function TodoList({ todos }: Props) {
  return (
    <ul className={styles.todolist}>
      {todos.map((todo) => {
        return <TodoItem key={todo.id} item={todo} />;
      })}
    </ul>
  );
}
