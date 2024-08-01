'use client';

import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import { SearchUser } from '@/model/user';
import MoonLoaderSpinner from '../../ui/Spinner/MoonLoaderSpinner';
import UserCard from '../UserCard/UserCard';
import styles from './UserSearch.module.css';
import useDebounce from '@/hooks/debounce';

export default function UserSearch() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword);
  const { data: users, isLoading, error } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          type='text'
          autoFocus
          placeholder='Search for a username or name'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>무언가 잘못 되었음</p>}
      {isLoading && <MoonLoaderSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>찾는 사용자가 없음</p>}
      {users && (
        <ul>
          {users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
