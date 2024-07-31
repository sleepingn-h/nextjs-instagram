'use client';

import usePosts from '@/hooks/posts';
import PostListCard from '../PostListCard/PostListCard';
import MoonLoaderSpinner from '@/components/ui/Spinner/MoonLoaderSpinner';

export default function PostList() {
  const { posts, isLoading, error } = usePosts();

  return (
    <section>
      {isLoading && <MoonLoaderSpinner />}
      <ul>
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
      </ul>
    </section>
  );
}
