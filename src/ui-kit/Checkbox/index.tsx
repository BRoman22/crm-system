import styles from './styles.module.scss';
import { useState } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isEditing?: boolean;
  setValue: (value: string) => void;
}

export default function Checkbox({
  value,
  setValue,
  name,
  checked,
  onChange,
  isEditing,
}: CheckboxProps) {
  const [error, setError] = useState<string>('');

  function validateInput(inputValue: string): boolean {
    if (!inputValue.trim()) {
      setError('Поле обязательно для заполнения');
      return false;
    }

    if (inputValue.length < 2) {
      setError(`"${inputValue}" - минимальная длина 2 символа (сейчас ${inputValue.length})`);
      return false;
    }

    if (inputValue.length > 64) {
      setError(
        `"${inputValue.substring(0, 20)}..." - максимальная длина 64 символа (сейчас ${inputValue.length})`
      );
      return false;
    }

    setError('');
    return true;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    if (isEditing) {
      if (newValue.length <= 64) {
        setValue(newValue);
        validateInput(newValue);
      } else {
        setError(`Максимальная длина 64 символа (сейчас ${newValue.length})`);
      }
    } else {
      setValue(newValue);
    }
  }

  return (
    <div className={styles.checkbox__wrapper}>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          className={styles.checkbox__input}
          onChange={onChange}
          disabled={isEditing}
        />
        <span className={`${styles.checkbox__check} ${checked ? styles.checked : ''}`} />
        <input
          type="text"
          className={`${styles.checkbox__title} ${checked ? styles.checked : ''}`}
          value={value}
          name={name}
          readOnly={!isEditing}
          onChange={handleChange}
        />
      </label>
      {error && isEditing && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}
