import { Form, Input, Button, Typography, message, Space } from 'antd';
import type { FormProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { UserRegistration } from '../../types';
import type { Rule } from 'antd/es/form';
import { useSignUpMutation } from '../../store/api/user';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import {
  ROUTES,
  AUTH_VALIDATION_USERNAME,
  AUTH_VALIDATION_LOGIN,
  AUTH_VALIDATION_PASSWORD,
  AUTH_VALIDATION_EMAIL,
  AUTH_VALIDATION_PHONE,
  REGISTRATION_MESSAGES,
  HTTP_STATUS_CODES,
} from '../../constans';

const { Link, Text, Title } = Typography;

interface UserRegistrationWithConfirm extends UserRegistration {
  confirmPassword: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [signUp] = useSignUpMutation();

  const onFinish = async (values: UserRegistrationWithConfirm) => {
    const { confirmPassword: _, ...data } = values;

    try {
      await signUp(data).unwrap();

      message.success(REGISTRATION_MESSAGES[HTTP_STATUS_CODES.CREATED]);
      navigate(ROUTES.LOGIN);
    } catch (err) {
      const error = err as FetchBaseQueryError;

      if (
        error.status === 'PARSING_ERROR' &&
        [
          HTTP_STATUS_CODES.BAD_REQUEST,
          HTTP_STATUS_CODES.CONFLICT,
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        ].includes(error.originalStatus)
      ) {
        message.error(REGISTRATION_MESSAGES[error.originalStatus]);
      } else {
        message.error('Что-то пошло не так');
      }
    }
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (error) => {
    message.error(error.message);
  };

  const usernameValidationRules: Rule[] = [
    { required: true, message: AUTH_VALIDATION_USERNAME.REQUIRED_MESSAGE },
    {
      pattern: AUTH_VALIDATION_USERNAME.PATTERN,
      message: AUTH_VALIDATION_USERNAME.CORRECT_USERNAME_MESSAGE,
    },
  ];

  const loginValidationRules: Rule[] = [
    { required: true, message: AUTH_VALIDATION_LOGIN.REQUIRED_MESSAGE },
    {
      pattern: AUTH_VALIDATION_LOGIN.PATTERN,
      message: AUTH_VALIDATION_LOGIN.CORRECT_LOGIN_MESSAGE,
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
    { required: true, message: AUTH_VALIDATION_PASSWORD.CONFIRM_PASSWORD_REQUIRED_MESSAGE },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(AUTH_VALIDATION_PASSWORD.CONFIRM_PASSWORD_MESSAGE));
      },
    }),
  ];

  const emailValidationRules: Rule[] = [
    { required: true, message: AUTH_VALIDATION_EMAIL.REQUIRED_MESSAGE },
    { type: 'email', message: AUTH_VALIDATION_EMAIL.CORRECT_EMAIL_MESSAGE },
  ];

  const phoneValidationRules: Rule[] = [
    { required: false, message: AUTH_VALIDATION_PHONE.REQUIRED_MESSAGE },
    {
      pattern: AUTH_VALIDATION_PHONE.PATTERN,
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
        <Form.Item name="username" rules={usernameValidationRules}>
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

        <Form.Item name="phoneNumber" rules={phoneValidationRules}>
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
