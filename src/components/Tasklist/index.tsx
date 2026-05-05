import styles from './styles.module.scss';
import { Checkbox, Button } from '../../ui-kit';
import { type TodoDTO, type TodoInfo, type TodoData, FILTER_LABELS } from '../../utils';
import EditIcon from '../../assets/icons/edit.svg';
import DeleteIcon from '../../assets/icons/trashcan.svg';
import { useState } from 'react';

interface TasklistProps {
  tasks: TodoDTO | null;
  filter: TodoKeys;
  setFilter: (value: TodoKeys) => void;
  handleCheckboxChange: (data: Pick<TodoData, 'id' | 'title' | 'isDone'>) => void;
  handleDelete: (id: number) => void;
  handleTitleChange: (data: Pick<TodoData, 'id' | 'title' | 'isDone'>) => void;
}

type TodoKeys = keyof TodoInfo;

export default function Tasklist({
  tasks,
  filter,
  setFilter,
  handleCheckboxChange,
  handleDelete,
  handleTitleChange,
}: TasklistProps) {
  const [edit, setEdit] = useState<number | null>(null);
  const [input, setInput] = useState<string>('');

  if (!tasks) return <div>Нет данных</div>;

  const FILTERS_CONFIG = (Object.keys(tasks.info) as TodoKeys[]).map((key) => ({
    label: FILTER_LABELS[key],
    value: key,
  }));

  function handleSaveTitle(data: Pick<TodoData, 'id' | 'title' | 'isDone'>) {
    console.log('handleSaveEdit', data);
    handleTitleChange(data);
    setEdit(null);
    setInput('');
  }

  function handleStartEdit(id: number, currentTitle: string) {
    setEdit(id);
    setInput(currentTitle);
  }

  return (
    <>
      <div className={styles.tasklist__header}>
        {FILTERS_CONFIG.map(({ label, value }) => (
          <h3
            key={value}
            className={`${styles.tasklist__title} ${filter === value ? styles.active : ''}`}
            onClick={() => setFilter(value)}
          >
            {`${label} (${tasks.info[value]})`}
          </h3>
        ))}
      </div>
      <ul className={styles.tasklist}>
        {tasks.data
          .filter(({ isDone }) => filter === 'all' || isDone === (filter === 'completed'))
          .map(({ id, title, isDone }) => {
            const isEditing = edit === id;
            return (
              <li key={id}>
                <Checkbox
                  value={isEditing ? input : title}
                  setValue={setInput}
                  checked={isDone}
                  onChange={() => handleCheckboxChange({ id, title, isDone: !isDone })}
                  isEditing={isEditing}
                  name="title"
                />
                <Button
                  title={
                    isEditing ? (
                      'сохранить'
                    ) : (
                      <img src={EditIcon} alt="edit" width={12} height={12} />
                    )
                  }
                  extraClassName={styles.button__edit}
                  onClick={() =>
                    isEditing
                      ? handleSaveTitle({ id, title: input, isDone })
                      : handleStartEdit(id, title)
                  }
                />
                <Button
                  title={
                    isEditing ? (
                      'отмена'
                    ) : (
                      <img src={DeleteIcon} alt="edit" width={12} height={12} />
                    )
                  }
                  extraClassName={styles.button__delete}
                  onClick={() => (isEditing ? setEdit(null) : handleDelete(id))}
                />
              </li>
            );
          })}
      </ul>
    </>
  );
}
