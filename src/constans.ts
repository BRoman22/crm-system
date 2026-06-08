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
  MIN_LENGTH_MESSAGE: (current: number) =>
    `Минимальная длина ${VALIDATION_TITLE.MIN_LENGTH} символа (сейчас ${current})`,
  MAX_LENGTH_MESSAGE: (current: number) =>
    `Максимальная длина ${VALIDATION_TITLE.MAX_LENGTH} символов (сейчас ${current})`,
};
