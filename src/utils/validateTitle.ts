import { VALIDATION_TITLE } from '../constans';

export function validateTitle(string: string): string {
  const trimmedTitle = string.trim();

  if (!trimmedTitle) {
    return VALIDATION_TITLE.REQUIRED_MESSAGE;
  }

  if (trimmedTitle.length < VALIDATION_TITLE.MIN_LENGTH) {
    return VALIDATION_TITLE.MIN_LENGTH_MESSAGE(trimmedTitle.length);
  }

  if (trimmedTitle.length > VALIDATION_TITLE.MAX_LENGTH) {
    return VALIDATION_TITLE.MAX_LENGTH_MESSAGE(trimmedTitle.length);
  }

  return '';
}
