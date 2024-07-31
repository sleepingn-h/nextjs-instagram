import styles from './Button.module.css';

type Props = {
  type?: 'submit' | 'reset' | 'button';
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  size: 'small' | 'big';
  mode?: 'basic' | 'colored';
  onClick?: () => void;
};

export default function Button({
  type = 'button',
  children,
  disabled,
  className,
  size,
  mode,
  onClick,
}: Props) {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${mode ? styles[mode] : ''} ${className ?? ''}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
