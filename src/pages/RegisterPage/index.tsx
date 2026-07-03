import { Form, Input, Button, Typography, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { Rule } from 'antd/es/form';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import {
  ROUTES,
  AUTH_VALIDATION_NAME,
  AUTH_VALIDATION_LOGIN,
  AUTH_VALIDATION_PASSWORD,
  AUTH_VALIDATION_EMAIL,
  AUTH_VALIDATION_PHONE,
} from '../../constans';

const { Link, Text, Title } = Typography;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: { username: string; password: string; remember: boolean }) => {
    console.log('Register values:', values);
    message.success('Регистрация выполнена успешно!');
    navigate(ROUTES.LOGIN);
  };

  const onFinishFailed = () => {
    message.error('Пожалуйста, проверьте введенные данные');
  };

  const nameValidationRules: Rule[] = [
    { required: true, message: AUTH_VALIDATION_NAME.REQUIRED_MESSAGE },
    {
      min: AUTH_VALIDATION_NAME.MIN_LENGTH,
      message: AUTH_VALIDATION_NAME.MIN_LENGTH_MESSAGE,
    },
    {
      max: AUTH_VALIDATION_NAME.MAX_LENGTH,
      message: AUTH_VALIDATION_NAME.MAX_LENGTH_MESSAGE,
    },
    {
      whitespace: true,
      message: AUTH_VALIDATION_NAME.ONLY_SPACES_MESSAGE,
    },
  ];

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

  const confirmPasswordValidationRules: Rule[] = [
    { required: true, message: 'Пожалуйста, подтвердите пароль!' },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Пароли не совпадают!'));
      },
    }),
  ];

  const emailValidationRules: Rule[] = [
    { required: true, message: AUTH_VALIDATION_EMAIL.REQUIRED_MESSAGE },
    { type: 'email', message: AUTH_VALIDATION_EMAIL.CORRECT_EMAIL_MESSAGE },
  ];

  const phoneValidationRules: Rule[] = [
    { required: true, message: AUTH_VALIDATION_PHONE.REQUIRED_MESSAGE },
    {
      pattern: /^\+7\d{10}$/,
      message: AUTH_VALIDATION_PHONE.CORRECT_PHONE_MESSAGE,
    },
  ];

  return (
    <>
      <Space style={{ display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
        <Title level={2}>{'Добро пожаловать!'}</Title>
        <Text type="secondary">{'Чтобы зарегистрироваться, введите свои данные'}</Text>
      </Space>

      <Form
        form={form}
        name="register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size="large"
        style={{ marginTop: 24 }}
      >
        <Form.Item name="name" rules={nameValidationRules}>
          <Input
            prefix={<IdcardOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Имя пользователя"
            size="large"
          />
        </Form.Item>

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

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={confirmPasswordValidationRules}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Повторите пароль"
            size="large"
          />
        </Form.Item>

        <Form.Item name="email" rules={emailValidationRules}>
          <Input
            prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Почтовый адрес"
            size="large"
          />
        </Form.Item>

        <Form.Item name="phone" rules={phoneValidationRules}>
          <Input
            prefix={<PhoneOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Телефон"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>

      <Space style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
        <Text>Уже есть аккаунт? </Text>
        <Link href={ROUTES.LOGIN}>Войдите сейчас</Link>
      </Space>
    </>
  );
}
