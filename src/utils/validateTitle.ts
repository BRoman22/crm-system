import { VALIDATION_TITLE } from '../constans';
import { type RuleObject } from 'antd/es/form';

export const validateTitle = (_: RuleObject, value: string) => {
  if (!value) {
    return Promise.reject(new Error(VALIDATION_TITLE.REQUIRED_MESSAGE));
  }

  if (value.length < VALIDATION_TITLE.MIN_LENGTH) {
    return Promise.reject(new Error(VALIDATION_TITLE.MIN_LENGTH_MESSAGE(value.length)));
  }

  if (value.length > VALIDATION_TITLE.MAX_LENGTH) {
    return Promise.reject(new Error(VALIDATION_TITLE.MAX_LENGTH_MESSAGE(value.length)));
  }

  return Promise.resolve();
};
