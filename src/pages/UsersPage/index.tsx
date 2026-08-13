import { Navigate, useNavigate } from 'react-router-dom';
import { useHasAccess } from '../../hooks/useHasAccess';
import { useState } from 'react';
import type { UserFilters, Profile, Role } from '../../types';
import { ROUTES } from '../../constans';
import type { MenuProps, TableProps } from 'antd';
import useDebounce from '../../hooks/useDebounce';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useChangeRoleMutation,
} from '../../store/api/admin';
import {
  SearchOutlined,
  FilterOutlined,
  MailOutlined,
  PhoneOutlined,
  ArrowRightOutlined,
  MoreOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import {
  Table,
  Input,
  Button,
  Tag,
  Space,
  Dropdown,
  Typography,
  Card,
  Flex,
  Modal,
  message,
  Radio,
  Divider,
} from 'antd';

const { Title } = Typography;

type BlockFilter = 'all' | 'blocked' | 'unblocked';

const roleColorMap: Record<Role, string> = {
  USER: 'purple',
  ADMIN: 'blue',
  MODERATOR: 'orange',
};

interface Props {
  redirectPath: string;
}

export default function UsersPage({ redirectPath }: Props) {
  const [changeRole, { isLoading: isChangingRole }] = useChangeRoleMutation();
  const [changingRoleId, setChangingRoleId] = useState<number | null>(null);
  const navigate = useNavigate();
  const hasAccess = useHasAccess(['ADMIN', 'MODERATOR']);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [blockFilter, setBlockFilter] = useState<BlockFilter>('all');
  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    sortBy: '',
    sortOrder: 'asc',
    isBlocked: undefined,
    limit: 10,
    page: 1,
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [tempBlockFilter, setTempBlockFilter] = useState<BlockFilter>('all');

  const [prevDebouncedSearch, setPrevDebouncedSearch] = useState(debouncedSearch);
  if (debouncedSearch !== prevDebouncedSearch) {
    setPrevDebouncedSearch(debouncedSearch);
    setFilters((prev) => ({ ...prev, page: 1 }));
  }

  const query: UserFilters = {
    ...filters,
    search: debouncedSearch,
    isBlocked: blockFilter === 'all' ? undefined : blockFilter === 'blocked',
  };

  const { data: users, isLoading } = useGetUsersQuery(query);
  const [deleteUser] = useDeleteUserMutation();
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
  const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation();
  const [togglingId, setTogglingId] = useState<number | null>(null);

  if (!hasAccess) {
    return <Navigate to={redirectPath} replace />;
  }

  const handleOpenFilters = () => {
    setTempBlockFilter(blockFilter);
    setIsFilterModalOpen(true);
  };

  const handleApplyFilters = () => {
    setBlockFilter(tempBlockFilter);
    setFilters((prev) => ({ ...prev, page: 1 }));
    setIsFilterModalOpen(false);
  };

  const handleResetFilters = () => {
    setTempBlockFilter('all');
  };

  const getRowMenu = (user: Profile): MenuProps['items'] => [
    {
      key: 'addRole',
      label: user.roles.includes('ADMIN') ? 'Забрать роль админа' : 'Сделать админом',
      onClick: () => handleAddRole(user),
    },
    { key: 'delete', label: 'Удалить', danger: true, onClick: () => handleDelete(user) },
  ];

  const handleToggleBlock = (user: Profile) => {
    const isCurrentlyBlocked = user.isBlocked;

    Modal.confirm({
      title: isCurrentlyBlocked
        ? `Разблокировать пользователя ${user.username}?`
        : `Заблокировать пользователя ${user.username}?`,
      icon: <ExclamationCircleFilled />,
      content: isCurrentlyBlocked
        ? 'Пользователь снова получит доступ к системе.'
        : 'Пользователь потеряет доступ к системе.',
      okText: isCurrentlyBlocked ? 'Разблокировать' : 'Заблокировать',
      okType: isCurrentlyBlocked ? 'primary' : 'danger',
      cancelText: 'Отмена',
      onOk: async () => {
        setTogglingId(user.id);
        try {
          if (isCurrentlyBlocked) {
            await unblockUser({ id: user.id }).unwrap();
            message.success(`Пользователь ${user.username} разблокирован`);
          } else {
            await blockUser({ id: user.id }).unwrap();
            message.success(`Пользователь ${user.username} заблокирован`);
          }
        } catch {
          message.error('Не удалось изменить статус блокировки');
        } finally {
          setTogglingId(null);
        }
      },
    });
  };

  const handleAddRole = (user: Profile) => {
    const isAdmin = user.roles.includes('ADMIN');

    Modal.confirm({
      title: isAdmin
        ? `Забрать роль администратора у ${user.username}?`
        : `Выдать роль администратора ${user.username}?`,
      icon: <ExclamationCircleFilled />,
      content: isAdmin
        ? 'Пользователь потеряет права администратора.'
        : 'Пользователь получит права администратора.',
      okText: isAdmin ? 'Забрать роль' : 'Выдать роль',
      okType: isAdmin ? 'danger' : 'primary',
      cancelText: 'Отмена',
      onOk: async () => {
        const nextRoles: Role[] = isAdmin
          ? user.roles.filter((role) => role !== 'ADMIN')
          : [...user.roles, 'ADMIN'];

        setChangingRoleId(user.id);
        try {
          await changeRole({ id: user.id, roles: nextRoles }).unwrap();
          message.success(
            isAdmin
              ? `Роль администратора отозвана у ${user.username}`
              : `${user.username} назначен администратором`
          );
        } catch {
          message.error('Не удалось изменить роль пользователя');
        } finally {
          setChangingRoleId(null);
        }
      },
    });
  };

  const handleDelete = (user: Profile) => {
    Modal.confirm({
      title: `Удалить пользователя ${user.username}?`,
      icon: <ExclamationCircleFilled />,
      content: 'Это действие нельзя отменить.',
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: async () => {
        try {
          await deleteUser(user.id).unwrap();
          message.success('Пользователь удалён');
        } catch {
          message.error('Не удалось удалить пользователя');
        }
      },
    });
  };

  const handleTableChange: TableProps<Profile>['onChange'] = (
    pagination,
    _tableFilters,
    sorter
  ) => {
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;
    const hasActiveSort = Boolean(singleSorter?.order);

    const sortOrder: UserFilters['sortOrder'] = hasActiveSort
      ? singleSorter.order === 'descend'
        ? 'desc'
        : 'asc'
      : 'asc';

    setFilters((prev) => ({
      ...prev,
      page: pagination.current ?? prev.page,
      limit: pagination.pageSize ?? prev.limit,
      sortBy: hasActiveSort ? (singleSorter.field as string) : undefined,
      sortOrder,
    }));
  };

  const renderFilterModal = () => (
    <Modal
      title="Фильтры"
      open={isFilterModalOpen}
      onCancel={() => setIsFilterModalOpen(false)}
      onOk={handleApplyFilters}
      okText="Применить"
      cancelText="Отмена"
      width={400}
      footer={[
        <Button key="reset" onClick={handleResetFilters}>
          Сбросить
        </Button>,
        <Button key="cancel" onClick={() => setIsFilterModalOpen(false)}>
          Отмена
        </Button>,
        <Button key="apply" type="primary" onClick={handleApplyFilters}>
          Применить
        </Button>,
      ]}
    >
      <Flex vertical style={{ padding: '16px 0' }}>
        <Typography.Text strong style={{ marginBottom: 12 }}>
          Статус блокировки
        </Typography.Text>
        <Radio.Group
          value={tempBlockFilter}
          onChange={(e) => setTempBlockFilter(e.target.value)}
          style={{ width: '100%' }}
        >
          <Flex vertical gap={8}>
            <Radio value="all" style={{ padding: '8px 12px', borderRadius: 6 }}>
              <Space>Все пользователи</Space>
            </Radio>
            <Radio value="blocked" style={{ padding: '8px 12px', borderRadius: 6 }}>
              <Space>Заблокированные</Space>
            </Radio>
            <Radio value="unblocked" style={{ padding: '8px 12px', borderRadius: 6 }}>
              <Space>Не заблокированные</Space>
            </Radio>
          </Flex>
        </Radio.Group>

        <Divider />

        <Flex style={{ marginTop: 8 }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {blockFilter === 'all' && 'Показаны все пользователи'}
            {blockFilter === 'blocked' && 'Показаны только заблокированные пользователи'}
            {blockFilter === 'unblocked' && 'Показаны только не заблокированные пользователи'}
          </Typography.Text>
        </Flex>
      </Flex>
    </Modal>
  );

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
      render: (isBlocked: Profile['isBlocked']) => (
        <Tag color={isBlocked ? 'red' : 'green'}>{isBlocked ? 'Заблокирован' : 'Активен'}</Tag>
      ),
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
          <Button
            onClick={() => handleToggleBlock(user)}
            loading={togglingId === user.id && (isBlocking || isUnblocking)}
            style={{ minWidth: 84 }}
            danger={!user.isBlocked}
          >
            {user.isBlocked ? 'Разблокировать' : 'Заблокировать'}
          </Button>
          <Button
            icon={<ArrowRightOutlined />}
            onClick={() => navigate(`/${ROUTES.USERS}/${user.id}`)}
          />
          <Dropdown
            menu={{ items: getRowMenu(user) }}
            trigger={['click']}
            disabled={changingRoleId === user.id && isChangingRole}
          >
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <Flex vertical gap={24} style={{ padding: 24 }}>
      {renderFilterModal()}

      <Title level={3} style={{ margin: 0 }}>
        Пользователи
      </Title>

      <Card variant="borderless" styles={{ body: { padding: 24 } }} style={{ borderRadius: 12 }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: 20 }}>
          <Flex align="center" gap={12}>
            <Title level={4} style={{ margin: 0 }}>
              Пользователи
            </Title>
            {blockFilter !== 'all' && (
              <Tag color={blockFilter === 'blocked' ? 'red' : 'green'}>
                {blockFilter === 'blocked' ? 'Заблокированные' : 'Не заблокированные'}
              </Tag>
            )}
          </Flex>
          <Space>
            <Input
              placeholder="Поиск по имени или email"
              prefix={<SearchOutlined style={{ color: 'var(--input-icon-color)' }} />}
              style={{ width: 320 }}
              allowClear
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              icon={<FilterOutlined />}
              onClick={handleOpenFilters}
              type={blockFilter !== 'all' ? 'primary' : 'default'}
            >
              Фильтры
            </Button>
          </Space>
        </Flex>

        <Table<Profile>
          rowKey="id"
          columns={columns}
          dataSource={users?.data}
          loading={isLoading}
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
