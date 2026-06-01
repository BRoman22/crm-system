import styles from './styles.module.scss';
import type { TodoInfo, TodoInfoFilters } from '../../utils';
import { FILTER_LABELS } from '../../utils';

interface Props {
  statuses: TodoInfo;
  filter: string;
  setFilter: (value: TodoInfoFilters) => void;
}

export default function TodoStatusFilter({ statuses, filter, setFilter }: Props) {
  const filters = (Object.keys(statuses) as TodoInfoFilters[]).map((key) => ({
    label: FILTER_LABELS[key],
    value: key,
  }));

  return (
    <div className={styles.statusFilter}>
      {filters.map(({ label, value }) => (
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
