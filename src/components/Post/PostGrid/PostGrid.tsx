import usePosts from '@/hooks/posts';
import MoonLoaderSpinner from '@/components/ui/Spinner/MoonLoaderSpinner';
import PostGridCard from '../PostGridCard/PostGridCard';
import styles from './PostGrid.module.css';

type Props = {
  username: string;
  query: string;
};

export default function PostGrid() {
  const { posts, isLoading } = usePosts();

  return (
    <>
      {isLoading && <MoonLoaderSpinner />}
      <ul className={styles.grids}>
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </>
  );
}
