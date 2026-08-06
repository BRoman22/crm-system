import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useHasAccess } from '../../hooks/useHasAccess';
import { Button, Typography, Flex } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Props {
  redirectPath: string;
}

export default function UserDetailsPage({ redirectPath }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hasAccess = useHasAccess(['ADMIN', 'MODERATOR']);

  if (!hasAccess || !id) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <Flex vertical gap={24} style={{ padding: 24 }}>
      <Flex align="center" gap={12}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
        <Title level={3} style={{ margin: 0 }}>
          Профиль пользователя
        </Title>
      </Flex>

      <div>ID: {id}</div>
    </Flex>
  );
}
