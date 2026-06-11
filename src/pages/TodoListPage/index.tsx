import { AddTodo, Todolist, TodoStatusFilter } from '../../components';
import type { MetaResponse, Todo, TodoInfo, TodoInfoFilters } from '../../types';
import { getTodos } from '../../api/endpoints/todos';
import { useEffect, useState, useCallback } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION } from '../../constans';

export default function TodoListPage() {
  const { Sider, Content } = Layout;
  const navigate = useNavigate();
  const [filter, setFilter] = useState<TodoInfoFilters>('all');
  const [todos, setTodos] = useState<MetaResponse<Todo, TodoInfo>>({
    data: [],
    info: {
      all: 0,
      completed: 0,
      inWork: 0,
    },
    meta: {
      totalAmount: 0,
    },
  });

  const fetchTodos = useCallback(() => {
    getTodos(filter).then(setTodos);
  }, [filter]);

  useEffect(() => {
    fetchTodos();

    const intervalId = setInterval(() => {
      fetchTodos();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [fetchTodos]);

  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = NAVIGATION.find((item) => item.key === key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#f2f4fa',
    padding: '30px',
  };

  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    backgroundColor: '#e3e6f4',
  };

  const layoutStyle = {
    width: '100%',
    height: '100vh',
  };

  return (
    <Layout style={layoutStyle}>
      <Sider width="20%" style={siderStyle}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[NAVIGATION[0].key]}
          items={NAVIGATION}
          onClick={handleMenuClick}
        />
      </Sider>
      <Content style={contentStyle}>
        <AddTodo fetchTodos={fetchTodos} />
        <TodoStatusFilter statuses={todos.info} filter={filter} setFilter={setFilter} />
        <Todolist todos={todos.data} fetchTodos={fetchTodos} />
      </Content>
    </Layout>
  );
}
