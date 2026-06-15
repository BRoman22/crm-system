export const FILTER_LABELS = {
  all: 'Все',
  completed: 'Выполнено',
  inWork: 'В работе',
};

export const ENDPOINTS = {
  todos: 'todos',
};

export const VALIDATION_TITLE = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 64,
  REQUIRED_MESSAGE: 'Поле обязательно для заполнения',
  ONLY_SPACES_MESSAGE: 'Поле не может состоять только из пробелов',
  MIN_LENGTH_MESSAGE: (current: number) =>
    `Минимальная длина ${VALIDATION_TITLE.MIN_LENGTH} символа (сейчас ${current})`,
  MAX_LENGTH_MESSAGE: (current: number) =>
    `Максимальная длина ${VALIDATION_TITLE.MAX_LENGTH} символов (сейчас ${current})`,
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
