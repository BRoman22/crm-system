import { Layout, Card, Image } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content, Sider } = Layout;

export default function AuthLayout() {
  return (
    <Layout>
      <Sider width="53%">
        <Image
          src="/src/assets/images/authLogo.webp"
          alt="logo"
          width="100%"
          height="100%"
          preview={false}
        />
      </Sider>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Card style={{ width: '60%' }}>{<Outlet />}</Card>
      </Content>
    </Layout>
  );
}
