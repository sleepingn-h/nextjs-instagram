'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import useMe from '@/hooks/me';
import { ProfileUser } from '@/model/user';
import Button from '@/components/ui/Button/Button';
import { PulseLoader } from 'react-spinners';
import styles from './UserFollowButton.module.css';

type Props = {
  user: ProfileUser;
};

export default function UserFollowButton({ user }: Props) {
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser && loggedInUser.following?.find((item) => item.username === username);
  const text = following ? 'Unfollow' : 'Follow';

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !following);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {showButton && (
        <div className={styles.followButton}>
          {isUpdating && (
            <div className={styles.loader}>
              <PulseLoader size={6} color='#ffffff' />
            </div>
          )}
          <Button
            size='small'
            disabled={isUpdating}
            className={`${styles.button} ${isUpdating ? styles.updating : ''} ${
              following ? styles.unfollowing : styles.following
            }`}
            onClick={handleFollow}
          >
            <span>{text}</span>
          </Button>
        </div>
      )}
    </>
  );
}
