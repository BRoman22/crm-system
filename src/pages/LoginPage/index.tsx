import { Form, Input, Button, Checkbox, Typography, message, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES, AUTH_VALIDATION_LOGIN, AUTH_VALIDATION_PASSWORD } from '../../constans';
import type { Rule } from 'antd/es/form';
import type { FormProps } from 'antd';

const { Link, Text, Title } = Typography;

interface Props {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: Props) {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: { username: string; password: string; remember: boolean }) => {
    console.log('Login values:', values);
    // message.success('Вход выполнен успешно!');

    onLogin();
    navigate(ROUTES.TODO_LIST);
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (error) => {
    message.error(error.message);
  };

  const loginValidationRules: Rule[] = [
    { required: true, message: AUTH_VALIDATION_LOGIN.REQUIRED_MESSAGE },
    {
      min: AUTH_VALIDATION_LOGIN.MIN_LENGTH,
      message: AUTH_VALIDATION_LOGIN.MIN_LENGTH_MESSAGE,
    },
    {
      max: AUTH_VALIDATION_LOGIN.MAX_LENGTH,
      message: AUTH_VALIDATION_LOGIN.MAX_LENGTH_MESSAGE,
    },
    {
      whitespace: true,
      message: AUTH_VALIDATION_LOGIN.ONLY_SPACES_MESSAGE,
    },
  ];

  const passwordValidationRules: Rule[] = [
    { required: true, message: AUTH_VALIDATION_PASSWORD.REQUIRED_MESSAGE },
    {
      min: AUTH_VALIDATION_PASSWORD.MIN_LENGTH,
      message: AUTH_VALIDATION_PASSWORD.MIN_LENGTH_MESSAGE,
    },
    {
      max: AUTH_VALIDATION_PASSWORD.MAX_LENGTH,
      message: AUTH_VALIDATION_PASSWORD.MAX_LENGTH_MESSAGE,
    },
    {
      whitespace: true,
      message: AUTH_VALIDATION_PASSWORD.ONLY_SPACES_MESSAGE,
    },
  ];

  return (
    <>
      <Space style={{ display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
        <Title level={2}>{'Добро пожаловать!'}</Title>
        <Text type="secondary">{'Введите логин и пароль'}</Text>
      </Space>

      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size="large"
        style={{ marginTop: 24 }}
      >
        <Form.Item name="login" rules={loginValidationRules}>
          <Input
            prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Логин"
            size="large"
          />
        </Form.Item>

        <Form.Item name="password" rules={passwordValidationRules}>
          <Input.Password
            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Пароль"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Space
            style={{
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>
            <Link href={ROUTES.FORGOT_PASSWORD}>Забыли пароль?</Link>
          </Space>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Войти
          </Button>
        </Form.Item>
      </Form>

      <Space style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
        <Text>Нет аккаунта? </Text>
        <Link href={ROUTES.REGISTER}>Зарегистрируйтесь сейчас</Link>
      </Space>
    </>
  );
}
