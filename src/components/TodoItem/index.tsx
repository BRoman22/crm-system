import styles from './styles.module.scss';
import { Checkbox, Button } from '../../ui-kit';
import EditIcon from '../../assets/icons/edit.svg';
import DeleteIcon from '../../assets/icons/trashcan.svg';
import { type TodoData } from '../../utils';

interface TodoItemProps {
  id: number;
  title: string;
  isDone: boolean;
  isEditing: boolean;
  value: string;
  setValue: (value: string) => void;
  setEdit: (id: number | null) => void;
  handleCheckboxChange: (data: Pick<TodoData, 'id' | 'title' | 'isDone'>) => void;
  handleStartEdit: (id: number, currentTitle: string) => void;
  handleSaveTitle: (data: Pick<TodoData, 'id' | 'title' | 'isDone'>) => void;
  handleDelete: (id: number) => void;
}

export default function TodoItem({
  id,
  title,
  isDone,
  isEditing,
  value,
  setValue,
  setEdit,
  handleCheckboxChange,
  handleStartEdit,
  handleSaveTitle,
  handleDelete,
}: TodoItemProps) {
  return (
    <li className={styles.tasklist__item}>
      <Checkbox
        value={isEditing ? value : title}
        setValue={setValue}
        checked={isDone}
        onChange={() => handleCheckboxChange({ id, title, isDone: !isDone })}
        isEditing={isEditing}
        name="title"
      />
      <Button
        title={isEditing ? 'сохранить' : <img src={EditIcon} alt="edit" width={12} height={12} />}
        extraClassName={styles.button__edit}
        onClick={() =>
          isEditing ? handleSaveTitle({ id, title: value, isDone }) : handleStartEdit(id, title)
        }
      />
      <Button
        title={isEditing ? 'отмена' : <img src={DeleteIcon} alt="edit" width={12} height={12} />}
        extraClassName={styles.button__delete}
        onClick={() => (isEditing ? setEdit(null) : handleDelete(id))}
      />
    </li>
  );
}
