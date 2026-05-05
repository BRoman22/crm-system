import styles from './styles.module.scss';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  title?: string | React.ReactNode;
  extraClassName?: string;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
export default function Button({ title, extraClassName, ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${extraClassName}`} {...props}>
      {title}
    </button>
  );
}
