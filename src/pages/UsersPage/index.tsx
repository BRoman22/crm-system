import { Navigate, useNavigate } from 'react-router-dom';
import { useHasAccess } from '../../hooks/useHasAccess';
import { useState } from 'react';
import { useGetUsersQuery } from '../../store/api/admin';
import type { UserFilters, Profile, Role } from '../../types';
import { ROUTES } from '../../constans';
import { Table, Input, Button, Tag, Space, Dropdown, Typography, Card, Flex } from 'antd';
import type { MenuProps, TableProps } from 'antd';
import useDebounce from '../../hooks/useDebounce';
import {
  SearchOutlined,
  FilterOutlined,
  MailOutlined,
  PhoneOutlined,
  ArrowRightOutlined,
  MoreOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const roleColorMap: Record<Role, string> = {
  USER: 'purple',
  ADMIN: 'blue',
  MODERATOR: 'orange',
};

interface Props {
  redirectPath: string;
}

export default function UsersPage({ redirectPath }: Props) {
  const navigate = useNavigate();
  const hasAccess = useHasAccess(['ADMIN', 'MODERATOR']);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [filters, setFilters] = useState<Omit<UserFilters, 'search'>>({
    sortBy: '',
    sortOrder: 'asc',
    isBlocked: false,
    limit: 10,
    page: 1,
  });

  const [prevDebouncedSearch, setPrevDebouncedSearch] = useState(debouncedSearch);
  if (debouncedSearch !== prevDebouncedSearch) {
    setPrevDebouncedSearch(debouncedSearch);
    setFilters((prev) => ({ ...prev, page: 1 }));
  }

  const query: UserFilters = { ...filters, search: debouncedSearch };
  const { data: users, isLoading } = useGetUsersQuery(query);

  if (!hasAccess) {
    return <Navigate to={redirectPath} replace />;
  }

  const getRowMenu = (): MenuProps['items'] => [
    { key: 'view', label: 'Просмотреть профиль' },
    { key: 'edit', label: 'Редактировать' },
    { key: 'delete', label: 'Удалить', danger: true },
  ];

  const handleToggleBlock = (user: Profile) => {
    // TODO: подключить апи блокировки/разблокировки
    console.log('toggle block for', user.id, !user.isBlocked);
  };

  const handleTableChange: TableProps<Profile>['onChange'] = (pagination, _, sorter) => {
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;
    const hasActiveSort = Boolean(singleSorter?.order);

    setFilters((prev) => ({
      ...prev,
      page: pagination.current ?? prev.page,
      limit: pagination.pageSize ?? prev.limit,
      sortBy: hasActiveSort ? (singleSorter.field as string) : '',
      sortOrder: singleSorter?.order === 'descend' ? 'desc' : 'asc',
    }));
  };

  const columns: TableProps<Profile>['columns'] = [
    {
      title: 'Имя',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      render: (_, user) => <Space>{user.username}</Space>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      render: (email: string) => (
        <Space>
          <MailOutlined style={{ color: 'var(--input-icon-color)' }} />
          <a href={`mailto:${email}`}>{email}</a>
        </Space>
      ),
    },
    {
      title: 'Телефон',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (phoneNumber: string) => (
        <Space>
          <PhoneOutlined style={{ color: 'var(--input-icon-color)' }} />
          {phoneNumber}
        </Space>
      ),
    },
    {
      title: 'Роли',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: Profile['roles']) => (
        <Space>
          {roles.map((role) => (
            <Tag key={role} color={roleColorMap[role]} style={{ borderRadius: 6 }}>
              {role}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Блокировка',
      dataIndex: 'isBlocked',
      key: 'isBlocked',
      render: (isBlocked: boolean) => (isBlocked ? '+' : '-'),
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: '',
      key: 'actions',
      width: 160,
      render: (_, user) => (
        <Space>
          <Button onClick={() => handleToggleBlock(user)} style={{ minWidth: 84 }}>
            {user.isBlocked ? 'разблок' : 'блок'}
          </Button>
          <Button
            icon={<ArrowRightOutlined />}
            onClick={() => navigate(`/${ROUTES.USERS}/${user.id}`)}
          />
          <Dropdown menu={{ items: getRowMenu() }} trigger={['click']}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <Flex vertical gap={24} style={{ padding: 24 }}>
      <Title level={3} style={{ margin: 0 }}>
        Пользователи
      </Title>

      <Card variant="borderless" styles={{ body: { padding: 24 } }} style={{ borderRadius: 12 }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: 20 }}>
          <Title level={4} style={{ margin: 0 }}>
            Пользователи
          </Title>
          <Space>
            <Input
              placeholder="Поиск по имени или email"
              prefix={<SearchOutlined style={{ color: 'var(--input-icon-color)' }} />}
              style={{ width: 320 }}
              allowClear
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button icon={<FilterOutlined />} onClick={() => console.log('filter')}>
              Filter
            </Button>
          </Space>
        </Flex>

        <Table<Profile>
          rowKey="id"
          columns={columns}
          dataSource={users?.data}
          loading={isLoading}
          // rowSelection={{}}
          onChange={handleTableChange}
          pagination={{
            current: query.page,
            pageSize: query.limit,
            total: users?.meta.totalAmount,
            showSizeChanger: false,
          }}
          scroll={{ x: 900 }}
        />
      </Card>
    </Flex>
  );
}
