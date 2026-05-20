import styles from './styles.module.scss';
import { validateString } from '../../utils';
import { useState } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isEditing: boolean;
  value: string;
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
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);

    const validationError = validateString(newValue);
    if (validationError) {
      setError(validationError);
    } else {
      setError('');
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
