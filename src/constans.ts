export const FILTER_LABELS: { [key: string]: string } = {
  all: 'Все',
  completed: 'Выполнено',
  inWork: 'В работе',
};

export const ENDPOINTS: { [key: string]: string } = {
  todos: 'todos',
};

export const VALIDATION_TITLE: {
  MIN_LENGTH: number;
  MAX_LENGTH: number;
  REQUIRED_MESSAGE: string;
  ONLY_SPACES_MESSAGE: string;
  MIN_LENGTH_MESSAGE: () => string;
  MAX_LENGTH_MESSAGE: () => string;
} = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 64,
  REQUIRED_MESSAGE: 'Поле обязательно для заполнения',
  ONLY_SPACES_MESSAGE: 'Поле не может состоять только из пробелов',
  MIN_LENGTH_MESSAGE: () => `Минимальная длина ${VALIDATION_TITLE.MIN_LENGTH} символа`,
  MAX_LENGTH_MESSAGE: () => `Максимальная длина ${VALIDATION_TITLE.MAX_LENGTH} символов`,
};

export const ROUTES: { [key: string]: string } = {
  TODO_LIST: '/',
  PROFILE: '/profile',
  NOT_FOUND: '/*',
};

export const NAVIGATION: { key: string; label: string; path: string }[] = [
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
];
