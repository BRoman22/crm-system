import styles from './styles.module.scss';
import { TodoItem } from '../index';
import type { MetaResponse, Todo, TodoInfo } from '../../utils';

interface TasklistProps {
  tasks: MetaResponse<Todo, TodoInfo>;
  handleCheckboxChange: (data: Pick<Todo, 'id' | 'title' | 'isDone'>) => void;
  handleDelete: (id: number) => void;
  handleTitleChange: (data: Pick<Todo, 'id' | 'title' | 'isDone'>) => void;
}

export default function Tasklist({
  tasks,
  handleCheckboxChange,
  handleDelete,
  handleTitleChange,
}: TasklistProps) {
  return (
    <ul className={styles.tasklist}>
      {tasks.data.map((item) => {
        return (
          <TodoItem
            key={item.id}
            item={item}
            handleCheckboxChange={handleCheckboxChange}
            handleDelete={handleDelete}
            handleTitleChange={handleTitleChange}
          />
        );
      })}
    </ul>
  );
}
