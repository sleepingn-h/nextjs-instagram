import Avatar from '@/components/Avatar/Avatar';
import styles from './PostUserAvatar.module.css';

type Props = {
  userImage: string;
  username: string;
};

export default function PostUserAvatar({ userImage, username }: Props) {
  return (
    <div className={styles.user}>
      <Avatar image={userImage} size='medium' />
      {username}
    </div>
  );
}
