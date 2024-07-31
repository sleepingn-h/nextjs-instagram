'use client';

import Link from 'next/link';
import useMe from '@/hooks/me';
import { PropagateLoader } from 'react-spinners';
import Avatar from '../Avatar/Avatar';
import ScrollableBar from '../ScrollableBar';
import styles from './FollowingBar.module.css';

export default function FollowingBar() {
  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 사용자 정보를 얻어옴
  const { user, isLoading, error } = useMe();

  // 4. 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌
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
