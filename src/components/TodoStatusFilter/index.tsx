import type { TodoInfo, TodoInfoFilters } from '../../types';
import { FILTER_LABELS } from '../../constans';
import { Tabs } from 'antd';

interface Props {
  statuses: TodoInfo;
  filter: string;
  setFilter: (value: TodoInfoFilters) => void;
}

function isTodoInfoFilters(value: string): value is TodoInfoFilters {
  return ['all', 'completed', 'inWork'].includes(value);
}

export default function TodoStatusFilter({ statuses, filter, setFilter }: Props) {
  const filters = Object.keys(statuses)
    .filter(isTodoInfoFilters)
    .map((key) => ({
      label: FILTER_LABELS[key],
      value: key,
    }));

  const handleTabChange = (key: string) => {
    setFilter(isTodoInfoFilters(key) ? key : 'all');
  };

  return (
    <Tabs
      items={filters.map(({ label, value }) => ({
        key: value,
        label: `${label} (${statuses[value]})`,
      }))}
      activeKey={filter}
      onChange={handleTabChange}
      size="large"
      centered
    />
  );
}
