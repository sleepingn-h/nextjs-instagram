import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import FollowingBar from '@/components/FollowingBar/FollowingBar';
import PostList from '@/components/Post/PostList/PostList';
import SideBar from '@/components/SideBar/SideBar';
import styles from './page.module.css';

export default async function HomePage() {
  // 이 페이지는 SSR로 로딩된다.
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className={styles.section}>
      <div className={styles.left}>
        <FollowingBar />
        <PostList />
      </div>
      <div className={styles.right}>
        <SideBar user={user} />
      </div>
    </section>
  );
}
