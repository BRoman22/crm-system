import styles from './styles.module.scss';
import { Checkbox, Button } from '../../ui-kit';
import { type Listitem, type status } from '../../types';
import { useState } from 'react';

interface TasklistProps {
  listData: Listitem[];
}

type filters = 'all' | status;

const FILTERS_CONFIG: { label: string; value: filters }[] = [
  { label: 'Все', value: 'all' },
  { label: 'в работе', value: 'active' },
  { label: 'выполнено', value: 'done' },
];

export default function Tasklist({ listData }: TasklistProps) {
  const [filter, setFilter] = useState<filters>('all');
  function getLength(value: filters) {
    return value === 'all'
      ? listData.length
      : listData.filter(({ status }) => status === value).length;
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
            {label} ({getLength(value)})
          </h3>
        ))}
      </div>
      <ul className={styles.tasklist}>
        {listData
          .filter(({ status }) => status === filter || filter === 'all')
          .map(({ id, title, status }) => (
            <li key={id}>
              <Checkbox title={title} checked={status === 'done'} />
              <Button extraClassName={styles.button__edit} />
              <Button extraClassName={styles.button__delete} />
            </li>
          ))}
      </ul>
    </>
  );
}
