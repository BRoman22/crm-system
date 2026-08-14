import { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message, Space, Spin, Result, Flex } from 'antd';
import type { FormProps } from 'antd';
import type { Rule } from 'antd/es/form';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { UserOutlined, MailOutlined, PhoneOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { Profile } from '../../types';
import { useHasAccess } from '../../hooks/useHasAccess';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../store/api/admin';
import {
  VALIDATION_USERNAME,
  VALIDATION_EMAIL,
  VALIDATION_PHONE,
  PROFILE_MESSAGES,
  HTTP_STATUS_CODES,
} from '../../constans';

const { Title } = Typography;

interface Props {
  redirectPath: string;
}

type ProfileFormValues = Pick<Profile, 'username' | 'email' | 'phoneNumber'>;

export default function UserDetailsPage({ redirectPath }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hasAccess = useHasAccess(['ADMIN', 'MODERATOR']);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const numericId = Number(id);
  const {
    data: user,
    isLoading: isUserLoading,
    refetch: refetchUser,
  } = useGetUserByIdQuery(numericId, { skip: !id });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user, form]);

  if (!hasAccess || !id) {
    return <Navigate to={redirectPath} replace />;
  }

  const onFinish = async (values: ProfileFormValues) => {
    try {
      await updateUser({ id: numericId, body: values }).unwrap();
      message.success(PROFILE_MESSAGES[HTTP_STATUS_CODES.OK]);
      setIsEditing(false);
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

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
    setIsEditing(false);
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

  const backButton = (
    <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
      Назад
    </Button>
  );

  if (isUserLoading) {
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

  if (!user) {
    return (
      <Flex vertical gap={24} style={{ padding: 24 }}>
        {backButton}
        <Result
          status="error"
          title="Не удалось загрузить пользователя"
          subTitle="Проверьте соединение с интернетом и попробуйте снова"
          extra={
            <Button type="primary" onClick={() => refetchUser()}>
              Повторить попытку
            </Button>
          }
        />
      </Flex>
    );
  }

  return (
    <Flex vertical gap={24} style={{ padding: 24, maxWidth: 480, margin: '0 auto' }}>
      <Flex align="center" gap={12}>
        {backButton}
        <Title level={3} style={{ margin: 0 }}>
          Профиль пользователя
        </Title>
      </Flex>

      <Form
        form={form}
        name="userDetails"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size="large"
      >
        <Form.Item name="username" rules={usernameValidationRules}>
          <Input
            prefix={<UserOutlined style={{ color: 'var(--input-icon-color)' }} />}
            placeholder="Имя пользователя"
            size="large"
            disabled={!isEditing}
          />
        </Form.Item>

        <Form.Item name="email" rules={emailValidationRules}>
          <Input
            prefix={<MailOutlined style={{ color: 'var(--input-icon-color)' }} />}
            placeholder="Почтовый адрес"
            size="large"
            disabled={!isEditing}
          />
        </Form.Item>

        <Form.Item name="phoneNumber" rules={phoneValidationRules}>
          <Input
            prefix={<PhoneOutlined style={{ color: 'var(--input-icon-color)' }} />}
            placeholder="Телефон"
            size="large"
            disabled={!isEditing}
          />
        </Form.Item>

        {isEditing ? (
          <Form.Item>
            <Space.Compact block>
              <Button size="large" onClick={handleCancelEdit} style={{ flex: 1 }}>
                Отмена
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isUpdating}
                style={{ flex: 1 }}
              >
                Сохранить
              </Button>
            </Space.Compact>
          </Form.Item>
        ) : (
          <Form.Item>
            <Button type="primary" block size="large" onClick={handleStartEdit}>
              Редактировать
            </Button>
          </Form.Item>
        )}
      </Form>
    </Flex>
  );
}
