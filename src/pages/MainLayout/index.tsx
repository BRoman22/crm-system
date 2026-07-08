import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { NAVIGATION_MENU } from '../../constans';
import { useAppSelector } from '../../store';

interface Props {
  redirectPath: string;
}

const { Sider, Content } = Layout;

export default function MainLayout({ redirectPath }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

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

  const layoutStyle: React.CSSProperties = {
    width: '100%',
    height: '100vh',
    flex: 1,
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = NAVIGATION_MENU.find((item) => item.key === key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  const selectedKey =
    NAVIGATION_MENU.find((item) => item.path === location.pathname)?.key ?? NAVIGATION_MENU[0].key;

  return (
    <Layout style={layoutStyle}>
      <Sider width="20%" style={siderStyle}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          items={NAVIGATION_MENU}
          onClick={handleMenuClick}
        />
      </Sider>
      <Content style={contentStyle}>{<Outlet />}</Content>
    </Layout>
  );
}
