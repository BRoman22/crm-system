export function validateTitle(string: string): string {
  const trimmedTitle = string.trim();

  if (!trimmedTitle) {
    return 'Поле обязательно для заполнения';
  }

  if (trimmedTitle.length < 2) {
    return `Минимальная длина 2 символа (сейчас ${trimmedTitle.length})`;
  }

  if (trimmedTitle.length > 64) {
    return `Максимальная длина 64 символа (сейчас ${trimmedTitle.length})`;
  }

  return '';
}
