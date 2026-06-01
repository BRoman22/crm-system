import styles from './styles.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  color: 'primary' | 'secondary';
}
export default function Button({ title, color = 'primary', ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[`button__${color}`]}`} {...props}>
      {title}
    </button>
  );
}
