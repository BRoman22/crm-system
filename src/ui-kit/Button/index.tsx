import styles from './styles.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  extraClassName?: string;
}
export default function Button({ title, extraClassName, ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${extraClassName}`} {...props}>
      {title}
    </button>
  );
}
