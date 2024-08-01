'use client';

import Link from 'next/link';
import useMe from '@/hooks/me';
import { PropagateLoader } from 'react-spinners';
import Avatar from '../Avatar/Avatar';
import ScrollableBar from '../ScrollableBar';
import styles from './FollowingBar.module.css';

export default function FollowingBar() {
  const { user, isLoading, error } = useMe();
  const users = user?.following;

  return (
    <section className={styles.section}>
      {isLoading ? (
        <PropagateLoader size={8} color='red' />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link className={styles.link} href={`/user/${username}`} key={username}>
              <Avatar image={image} highlight />
              <span className={styles.username}>{username}</span>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
