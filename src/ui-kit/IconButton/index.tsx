import styles from './styles.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  extraClassName?: string;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  children?: React.ReactNode;
}
export default function IconButton({ extraClassName, children, ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${extraClassName}`} {...props}>
      {children}
    </button>
  );
}
