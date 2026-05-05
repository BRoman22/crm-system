import styles from './styles.module.scss';

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
  return (
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
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
}
