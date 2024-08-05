import Button from '@/components/ui/Button/Button';
import CloseIcon from '@/components/ui/icons/CloseIcon';
import styles from './ReadMeModal.module.css';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function ReadMeModal({ children, onClose }: Props) {
  return (
    <div
      className={styles.portal}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <Button size='big' className={styles.button} onClick={() => onClose()}>
        <CloseIcon className={styles.icon} />
        <span className='sr-only'>닫기</span>
      </Button>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
