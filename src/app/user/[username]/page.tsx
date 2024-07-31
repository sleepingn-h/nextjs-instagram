import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getUserForProfile } from '@/service/user';
import UserPosts from '@/components/User/UserPosts/UserPosts';
import UserProfile from '@/components/User/UserProfile/UserProfile';
import { cache } from 'react';

type Props = { params: { username: string } };

const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({ params: { username } }: Props) {
  // 상단: 사용자의 프로필 이미지와 정보(username, name, 숫자)
  // 하단: 3개의 탭(posts, liked, bookmarks)
  const user = await getUser(username);
  if (!user) {
    notFound();
  }

  return (
    <section>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({ params: { username } }: Props): Promise<Metadata> {
  const user = await getUser(username);

  return {
    title: `${user?.name} (@${user?.username}) Instantgram Photos`,
    description: `${user?.name}'s all Instantgram posts`,
  };
}