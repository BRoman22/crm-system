import { Form, Input, Button, Checkbox, Typography, message, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { Rule } from 'antd/es/form';
import type { FormProps } from 'antd';
import { useSignInMutation } from '../../store/api/user';
import type { AuthData } from '../../types';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  ROUTES,
  VALIDATION_LOGIN,
  VALIDATION_PASSWORD,
  HTTP_STATUS_CODES,
  LOGIN_MESSAGES,
} from '../../constans';

const { Link, Text, Title } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [signIn] = useSignInMutation();

  const onFinish = async (values: AuthData & { remember: boolean }) => {
    const { remember: _, ...data } = values;

    try {
      await signIn(data).unwrap();
      navigate(ROUTES.TODO_LIST);
      message.success(LOGIN_MESSAGES[HTTP_STATUS_CODES.OK]);
    } catch (err) {
      const error = err as FetchBaseQueryError;

      if (
        error.status === 'PARSING_ERROR' &&
        [
          HTTP_STATUS_CODES.BAD_REQUEST,
          HTTP_STATUS_CODES.UNAUTHORIZED,
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        ].includes(error.originalStatus)
      ) {
        message.error(LOGIN_MESSAGES[error.originalStatus]);
      } else {
        message.error('Что-то пошло не так');
      }
    }
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (error) => {
    message.error(error.message);
  };

  const loginValidationRules: Rule[] = [
    { required: true, message: VALIDATION_LOGIN.REQUIRED_MESSAGE },
    {
      pattern: VALIDATION_LOGIN.PATTERN,
      message: VALIDATION_LOGIN.CORRECT_LOGIN_MESSAGE,
    },
  ];

  const passwordValidationRules: Rule[] = [
    { required: true, message: VALIDATION_PASSWORD.REQUIRED_MESSAGE },
    {
      min: VALIDATION_PASSWORD.MIN_LENGTH,
      message: VALIDATION_PASSWORD.MIN_LENGTH_MESSAGE,
    },
    {
      max: VALIDATION_PASSWORD.MAX_LENGTH,
      message: VALIDATION_PASSWORD.MAX_LENGTH_MESSAGE,
    },
    {
      whitespace: true,
      message: VALIDATION_PASSWORD.ONLY_SPACES_MESSAGE,
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
            prefix={<UserOutlined style={{ color: 'var(--input-icon-color)' }} />}
            placeholder="Логин"
            size="large"
          />
        </Form.Item>

        <Form.Item name="password" rules={passwordValidationRules}>
          <Input.Password
            prefix={<LockOutlined style={{ color: 'var(--input-icon-color)' }} />}
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
