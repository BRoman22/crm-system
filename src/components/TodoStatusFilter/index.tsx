import type { TodoInfo, TodoInfoFilters } from '../../types';
import { FILTER_LABELS } from '../../constans';
import { Tabs } from 'antd';

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
    <Tabs
      items={filters.map(({ label, value }) => ({
        key: value,
        label: `${label} (${statuses[value]})`,
      }))}
      activeKey={filter}
      onChange={(key) => setFilter(key as TodoInfoFilters)}
      size="large"
      centered
    />
  );
}
