import styles from './styles.module.scss';
import { Checkbox, Button } from '../../ui-kit';
import { type TodoDTO, type TodoInfo, FILTER_LABELS } from '../../utils';
import { useState } from 'react';

interface TasklistProps {
  listData: TodoDTO | null;
}

type TodoKeys = keyof TodoInfo;

export default function Tasklist({ listData }: TasklistProps) {
  const [filter, setFilter] = useState<TodoKeys>('all');

  if (!listData) return <div>Нет данных</div>;

  const FILTERS_CONFIG = (Object.keys(listData.info) as TodoKeys[]).map((key) => ({
    label: FILTER_LABELS[key],
    value: key,
  }));

  return (
    <>
      <div className={styles.tasklist__header}>
        {FILTERS_CONFIG.map(({ label, value }) => (
          <h3
            key={value}
            className={`${styles.tasklist__title} ${filter === value ? styles.active : ''}`}
            onClick={() => setFilter(value)}
          >
            {`${label} (${listData.info[value]})`}
          </h3>
        ))}
      </div>
      <ul className={styles.tasklist}>
        {listData.data
          .filter(({ isDone }) => filter === 'all' || isDone === (filter === 'completed'))
          .map(({ id, title, isDone }) => (
            <li key={id}>
              <Checkbox title={title} checked={isDone} />
              <Button extraClassName={styles.button__edit} />
              <Button extraClassName={styles.button__delete} />
            </li>
          ))}
      </ul>
    </>
  );
}
