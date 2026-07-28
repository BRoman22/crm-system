export const FILTER_LABELS: { [key: string]: string } = {
  all: 'Все',
  completed: 'Выполнено',
  inWork: 'В работе',
};

export const ENDPOINTS: { [key: string]: string } = {
  TODOS: 'todos',
  SIGNIN: 'auth/signin',
  SIGNUP: 'auth/signup',
  REFRESH: 'auth/refresh',
  LOGOUT: '/user/logout',
  PROFILE: '/user/profile',
  RESET_PASSWORD: '/user/profile/reset-password',
};

export const ROUTES: { [key: string]: string } = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  TODO_LIST: '/',
  PROFILE: '/profile',
  USERS: '/users',
  NOT_FOUND: '/*',
};

export const NAVIGATION_MENU: { key: string; label: string; path: string }[] = [
  {
    key: '1',
    label: 'Список задач',
    path: ROUTES.TODO_LIST,
  },
  {
    key: '2',
    label: 'Профиль',
    path: ROUTES.PROFILE,
  },
  {
    key: '3',
    label: 'Пользователи',
    path: ROUTES.USERS,
  },
];

export const TODOS_AUTO_REFRESH_INTERVAL: number = 5000;

export const TODOS_MESSAGES: { [key: string]: string } = {
  TITLE: 'Ошибка',
  UPDATE_STATUS: 'Не удалось обновить статус задачи. Пожалуйста, попробуйте снова.',
  UPDATE_TITLE: 'Не удалось обновить задачу. Пожалуйста, попробуйте снова.',
  DELETE_TODO: 'Не удалось удалить задачу. Пожалуйста, попробуйте снова.',
  CREATE_TODO: 'Не удалось создать задачу. Пожалуйста, попробуйте снова.',
  GET_TODOS: 'Не удалось загрузить задачи. Пожалуйста, обновите страницу.',
};

type Validation = {
  MIN_LENGTH: number;
  MAX_LENGTH: number;
  REQUIRED_MESSAGE: string;
  ONLY_SPACES_MESSAGE: string;
  MIN_LENGTH_MESSAGE: string;
  MAX_LENGTH_MESSAGE: string;
};

const TODOS_TITLE_MIN_LENGTH = 2;
const TODOS_TITLE_MAX_LENGTH = 64;
export const TODOS_VALIDATION_TITLE: Validation = {
  MIN_LENGTH: TODOS_TITLE_MIN_LENGTH,
  MAX_LENGTH: TODOS_TITLE_MAX_LENGTH,
  REQUIRED_MESSAGE: 'Поле обязательно для заполнения',
  ONLY_SPACES_MESSAGE: 'Поле не может состоять только из пробелов',
  MIN_LENGTH_MESSAGE: `Минимальная длина ${TODOS_TITLE_MIN_LENGTH} символа`,
  MAX_LENGTH_MESSAGE: `Максимальная длина ${TODOS_TITLE_MAX_LENGTH} символов`,
};

export const VALIDATION_USERNAME: {
  PATTERN: RegExp;
  CORRECT_USERNAME_MESSAGE: string;
  REQUIRED_MESSAGE: string;
} = {
  PATTERN: /^[a-zA-Zа-яА-ЯёЁ]{1,60}$/,
  CORRECT_USERNAME_MESSAGE: 'от 1 до 60 символов русского/латинского алфавита',
  REQUIRED_MESSAGE: 'Пожалуйста, введите ваше имя',
};

export const VALIDATION_LOGIN: {
  PATTERN: RegExp;
  CORRECT_LOGIN_MESSAGE: string;
  REQUIRED_MESSAGE: string;
} = {
  PATTERN: /^[A-Za-z]{2,60}$/,
  CORRECT_LOGIN_MESSAGE: 'от 2 до 60 символов латинского алфавита',
  REQUIRED_MESSAGE: 'Пожалуйста, введите ваш логин',
};

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 60;
export const VALIDATION_PASSWORD: Validation & {
  CONFIRM_PASSWORD_REQUIRED_MESSAGE: string;
  CONFIRM_PASSWORD_MESSAGE: string;
} = {
  MIN_LENGTH: PASSWORD_MIN_LENGTH,
  MAX_LENGTH: PASSWORD_MAX_LENGTH,
  REQUIRED_MESSAGE: 'Пожалуйста, введите ваш пароль',
  ONLY_SPACES_MESSAGE: 'Поле не может состоять только из пробелов',
  MIN_LENGTH_MESSAGE: `Пароль должен содержать минимум ${PASSWORD_MIN_LENGTH} символа`,
  MAX_LENGTH_MESSAGE: `Пароль должен содержать максимум ${PASSWORD_MAX_LENGTH} символов`,
  CONFIRM_PASSWORD_REQUIRED_MESSAGE: 'Пожалуйста, повторите пароль',
  CONFIRM_PASSWORD_MESSAGE: 'Пароли не совпадают',
};

export const VALIDATION_EMAIL: { [key: string]: string } = {
  REQUIRED_MESSAGE: 'Пожалуйста, введите ваш почтовый адрес',
  CORRECT_EMAIL_MESSAGE: 'Пожалуйста, введите корректный email адрес',
};

export const VALIDATION_PHONE: {
  PATTERN: RegExp;
  REQUIRED_MESSAGE: string;
  CORRECT_PHONE_MESSAGE: string;
} = {
  PATTERN: /^\+7\d{10}$/,
  REQUIRED_MESSAGE: 'Пожалуйста, введите ваш номер телефона',
  CORRECT_PHONE_MESSAGE: 'Введите номер в формате +7XXXXXXXXXX (10 цифр после +7)',
};

export const HTTP_STATUS_CODES: { [key: string]: number } = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const REGISTRATION_MESSAGES: { [key: string]: string } = {
  [HTTP_STATUS_CODES.CREATED]: 'Вы успешно зарегистрированы',
  [HTTP_STATUS_CODES.CONFLICT]: 'Пользователь с таким логином уже существует',
  [HTTP_STATUS_CODES.BAD_REQUEST]: 'Ошибка при регистрации. Пожалуйста, попробуйте еще раз.',
  [HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR]: 'Ошибка сервера. Пожалуйста, попробуйте позже.',
};

export const LOGIN_MESSAGES: { [key: string]: string } = {
  [HTTP_STATUS_CODES.OK]: 'Вы успешно вошли в систему',
  [HTTP_STATUS_CODES.BAD_REQUEST]: 'Ошибка при входе в систему. Пожалуйста, попробуйте еще раз.',
  [HTTP_STATUS_CODES.UNAUTHORIZED]: 'Неверные логин или пароль',
  [HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR]: 'Ошибка сервера. Пожалуйста, попробуйте позже.',
};

export const PROFILE_MESSAGES: { [key: string]: string } = {
  [HTTP_STATUS_CODES.OK]: 'Профиль успешно обновлен',
  [HTTP_STATUS_CODES.BAD_REQUEST]: 'Ошибка при обновлении профиля. Пожалуйста, попробуйте еще раз.',
  [HTTP_STATUS_CODES.NOT_FOUND]: 'Профиль не найден',
  [HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR]: 'Ошибка сервера. Пожалуйста, попробуйте позже.',
};
