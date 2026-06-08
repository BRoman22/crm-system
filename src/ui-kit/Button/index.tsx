import styles from './styles.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  color: 'primary' | 'secondary';
}
export default function Button({ title, color = 'primary', ...props }: Props) {
  return (
    <button className={`${styles.button} ${styles[`button__${color}`]}`} {...props}>
      {title}
    </button>
  );
}
