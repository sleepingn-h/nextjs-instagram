'use client';

import { useState } from 'react';
import { CacheKeysContext } from '@/context/CacheKeysContext';
import { ProfileUser } from '@/model/user';
import BookMarkIcon from '@/components/ui/icons/BookMarkIcon';
import HeartIcon from '@/components/ui/icons/HeartIcon';
import PostsIcon from '@/components/ui/icons/PostsIcon';
import Button from '@/components/ui/Button/Button';
import PostGrid from '@/components/Post/PostGrid/PostGrid';
import styles from './UserPosts.module.css';

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: 'posts', icon: <PostsIcon className={styles.icon} /> },
  { type: 'saved', icon: <BookMarkIcon className={styles.icon} /> },
  { type: 'liked', icon: <HeartIcon className={styles.icon} /> },
];
export default function UserPosts({ user: { username } }: Props) {
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <>
      <ul className={styles.tabs}>
        {tabs.map(({ type, icon }) => (
          <li key={type}>
            <Button
              className={`${styles.tab} ${type === query ? styles.active : ''}`}
              onClick={() => setQuery(type)}
            >
              {icon} {type}
            </Button>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider value={{ postsKey: `/api/users/${username}/${query}` }}>
        <PostGrid />
      </CacheKeysContext.Provider>
    </>
  );
}
