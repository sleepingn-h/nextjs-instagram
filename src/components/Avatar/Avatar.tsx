import styles from './Avatar.module.css';

type Props = {
  image?: string | null;
  size?: 'small' | 'medium' | 'large' | 'xl';
  highlight?: boolean;
};
export default function Avatar({ image, size = 'large', highlight = false }: Props) {
  return (
    <div className={`${styles.avatar} ${styles[size]} ${highlight && styles.highlight}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.image}
        alt='user profile'
        src={image ?? undefined}
        referrerPolicy='no-referrer'
      />
    </div>
  );
}
