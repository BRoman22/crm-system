import { useState } from 'react';
import styles from './styles.module.scss';

interface CheckboxProps {
  title?: string | React.ReactNode;
  checked: boolean;
  disabled?: boolean;
  name?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function Checkbox({ title, disabled, name, checked, ...props }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const toggle = () => setIsChecked(!isChecked);

  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        className={styles.checkbox__input}
        checked={isChecked}
        onChange={toggle}
        disabled={disabled}
        name={name}
        {...props}
      />
      <span className={`${styles.checkbox__check} ${isChecked ? styles.checked : ''}`} />
      {title && (
        <span className={`${styles.checkbox__title} ${isChecked ? styles.checked : ''}`}>
          {title}
        </span>
      )}
    </label>
  );
}
