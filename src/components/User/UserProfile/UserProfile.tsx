import { ProfileUser } from '@/model/user';
import Avatar from '@/components/Avatar/Avatar';
import UserFollowButton from '../UserFollowButton/UserFollowButton';
import styles from './UserProfile.module.css';

type Props = {
  user: ProfileUser;
};
export default function UserProfile({ user }: Props) {
  const { image, username, followers, following, posts } = user;
  const info = [
    { title: 'posts', data: posts },
    { title: 'followers', data: followers },
    { title: 'following', data: following },
  ];

  return (
    <div className={styles.user}>
      <Avatar image={image} size='large' highlight />
      <div className={styles.datas}>
        <div className={styles.userTop}>
          <h1 className={styles.userName}>{username}</h1>
          <UserFollowButton user={user} />
        </div>
        <ul className={styles.userInfo}>
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span>{data}</span>
              {title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
