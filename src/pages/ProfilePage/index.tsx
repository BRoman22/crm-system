import { Form, Input, Button, Typography, message, Space, Spin, Result } from 'antd';
import type { FormProps } from 'antd';
import type { Rule } from 'antd/es/form';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import type { Profile } from '../../types';
import { useEffect } from 'react';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLogoutMutation,
} from '../../store/api/user';
import {
  VALIDATION_USERNAME,
  VALIDATION_EMAIL,
  VALIDATION_PHONE,
  PROFILE_MESSAGES,
  HTTP_STATUS_CODES,
} from '../../constans';

const { Text, Title } = Typography;

type ProfileFormValues = Pick<Profile, 'username' | 'email' | 'phoneNumber'>;

export default function ProfilePage() {
  const [form] = Form.useForm();

  const {
    data: profile,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        username: profile.username,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
      });
    }
  }, [profile, form]);

  const onFinish = async (values: ProfileFormValues) => {
    try {
      await updateProfile(values).unwrap();
      message.success(PROFILE_MESSAGES[HTTP_STATUS_CODES.OK]);
    } catch (err) {
      const error = err as FetchBaseQueryError;

      if (
        error.status === 'PARSING_ERROR' &&
        [
          HTTP_STATUS_CODES.BAD_REQUEST,
          HTTP_STATUS_CODES.NOT_FOUND,
          HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        ].includes(error.originalStatus)
      ) {
        message.error(PROFILE_MESSAGES[error.originalStatus]);
      } else {
        message.error('Что-то пошло не так');
      }
    }
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (error) => {
    message.error(error.message);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const usernameValidationRules: Rule[] = [
    { required: true, message: VALIDATION_USERNAME.REQUIRED_MESSAGE },
    {
      pattern: VALIDATION_USERNAME.PATTERN,
      message: VALIDATION_USERNAME.CORRECT_USERNAME_MESSAGE,
    },
  ];

  const emailValidationRules: Rule[] = [
    { required: true, message: VALIDATION_EMAIL.REQUIRED_MESSAGE },
    { type: 'email', message: VALIDATION_EMAIL.CORRECT_EMAIL_MESSAGE },
  ];

  const phoneValidationRules: Rule[] = [
    { required: false, message: VALIDATION_PHONE.REQUIRED_MESSAGE },
    {
      pattern: VALIDATION_PHONE.PATTERN,
      message: VALIDATION_PHONE.CORRECT_PHONE_MESSAGE,
    },
  ];

  if (isProfileLoading) {
    return (
      <Spin
        size="large"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }

  if (!profile) {
    return (
      <Result
        status="error"
        title="Не удалось загрузить профиль"
        subTitle="Проверьте соединение с интернетом и попробуйте снова"
        extra={[
          <Button type="primary" onClick={() => refetchProfile()}>
            Повторить попытку
          </Button>,
          <Button key="logout" danger loading={isLoggingOut} onClick={handleLogout}>
            Выйти
          </Button>,
        ]}
      />
    );
  }

  return (
    <>
      <Space style={{ display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
        <Title level={2}>{'Мой профиль'}</Title>
        <Text type="secondary">{'Здесь вы можете изменить свои данные'}</Text>
      </Space>

      <Form
        form={form}
        name="profile"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size="large"
        style={{ marginTop: 24 }}
      >
        <Form.Item name="username" rules={usernameValidationRules}>
          <Input
            prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Имя пользователя"
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
          <Button type="primary" htmlType="submit" block size="large" loading={isUpdating}>
            Сохранить изменения
          </Button>
        </Form.Item>
      </Form>

      <Button danger block size="large" loading={isLoggingOut} onClick={handleLogout}>
        Выйти
      </Button>
    </>
  );
}
