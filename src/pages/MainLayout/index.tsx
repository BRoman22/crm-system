import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION } from '../../constans';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  const { Sider, Content } = Layout;
  const navigate = useNavigate();

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

  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = NAVIGATION.find((item) => item.key === key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
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
      <Content style={contentStyle}>{children}</Content>
    </Layout>
  );
};
