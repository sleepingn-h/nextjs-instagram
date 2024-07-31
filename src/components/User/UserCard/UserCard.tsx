import { SearchUser } from '@/model/user';
import Link from 'next/link';
import Avatar from '../../Avatar/Avatar';
import styles from './UserCard.module.css';

type Props = {
  user: SearchUser;
};

export default function UserCard({ user: { name, username, image, following, followers } }: Props) {
  return (
    <Link className={styles.link} href={`/user/${username}`}>
      <Avatar image={image} />
      <div className={styles.user}>
        <p className={styles.userId}>{username}</p>
        <p className={styles.userName}>{name}</p>
        <p className={styles.userInfo}>{`${followers} followers ${following} followings`}</p>
      </div>
    </Link>
  );
}
