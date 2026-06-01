import styles from './styles.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  children?: React.ReactNode;
  color: 'primary' | 'secondary';
}
export default function IconButton({ children, color = 'primary', ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[`button__${color}`]}`} {...props}>
      {children}
    </button>
  );
}
