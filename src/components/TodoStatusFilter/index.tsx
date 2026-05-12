import styles from './styles.module.scss';
import type { TodoInfo, TodoKeys } from '../../utils';
import { FILTER_LABELS } from '../../utils';

interface TodoStatusFilterProps {
  statuses: TodoInfo;
  filter: string;
  setFilter: (value: TodoKeys) => void;
}

export default function TodoStatusFilter({ statuses, filter, setFilter }: TodoStatusFilterProps) {
  const FILTERS_CONFIG = (Object.keys(statuses) as TodoKeys[]).map((key) => ({
    label: FILTER_LABELS[key],
    value: key,
  }));

  return (
    <div className={styles.statusFilter}>
      {FILTERS_CONFIG.map(({ label, value }) => (
        <h3
          key={value}
          className={`${styles.statusFilter__title} ${filter === value ? styles.active : ''}`}
          onClick={() => setFilter(value)}
        >
          {`${label} (${statuses[value]})`}
        </h3>
      ))}
    </div>
  );
}
