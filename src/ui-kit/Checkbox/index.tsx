import styles from './styles.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isEditing: boolean;
}

export default function Checkbox({ checked, onChange, isEditing }: CheckboxProps) {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        className={styles.checkbox__input}
        onChange={onChange}
        disabled={isEditing}
      />
      <span className={`${styles.checkbox__check} ${checked ? styles.checked : ''}`} />
    </label>
  );
}
