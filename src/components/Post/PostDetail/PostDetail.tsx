import Image from 'next/image';
import { SimplePost } from '@/model/post';
import useFullPost from '@/hooks/post';
import useMe from '@/hooks/me';
import ActionBar from '@/components/ActionBar/ActionBar';
import Avatar from '@/components/Avatar/Avatar';
import PostUserAvatar from '../PostUserAvatar/PostUserAvatar';
import styles from './PostDetail.module.css';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image } = post;
  const { post: data, postComment } = useFullPost(id);
  const comments = data?.comments;

  return (
    <section className={styles.section}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes='650px'
        />
      </div>
      <div className={styles.content}>
        <PostUserAvatar userImage={userImage} username={username} />
        <ul className={styles.comments}>
          {comments &&
            comments.map(({ image, username: commentUsername, comment }, index) => (
              <li className={styles.list} key={index}>
                <Avatar image={image} size='small' highlight={commentUsername === username} />
                <div className={styles.item}>
                  <span className={styles.username}>{commentUsername}</span>
                  <span className={styles.comment}>{comment}</span>
                </div>
              </li>
            ))}
        </ul>
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
}
