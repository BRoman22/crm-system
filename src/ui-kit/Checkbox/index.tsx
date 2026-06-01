import styles from './styles.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  isEditing: boolean;
}

export default function Checkbox({ checked, onChange, isEditing }: Props) {
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
