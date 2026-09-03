import { Layout, Card, Image } from 'antd';
import { Outlet } from 'react-router-dom';
import authImage from '../../assets/images/authImage.webp';

const { Content, Sider } = Layout;

export default function AuthLayout() {
  return (
    <Layout>
      <Sider width="53%">
        <Image src={authImage} alt="logo" width="100%" height="100%" preview={false} />
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
