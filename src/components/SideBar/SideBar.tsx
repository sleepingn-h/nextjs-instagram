import { AuthUser } from '@/model/user';
import Avatar from '../Avatar/Avatar';
import styles from './SideBar.module.css';

type Props = {
  user: AuthUser;
};
export default function SideBar({ user: { name, username, image } }: Props) {
  return (
    <section className={styles.side}>
      <div className={styles.info}>
        {image && <Avatar image={image} />}
        <div className={styles.text}>
          <p className={styles.username}>{username}</p>
          <p className={styles.name}>{name}</p>
        </div>
      </div>
      <p className={styles.introduce}></p>
      <p className={styles.copyright}>@Copyright INSTANTGRAM from METAL</p>
    </section>
  );
}
