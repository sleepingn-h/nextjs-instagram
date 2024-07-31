import useMe from '@/hooks/me';
import usePosts from '@/hooks/posts';
import { Comment, SimplePost } from '@/model/post';
import { parseDate } from '@/util/date';
import ToggleButton from '../ui/ToggleButton/ToggleButton';
import HeartIcon from '@/components/ui/icons/HeartIcon';
import HeartFillIcon from '../ui/icons/HeartFillIcon';
import BookMarkIcon from '@/components/ui/icons/BookMarkIcon';
import BookMarkFillIcon from '../ui/icons/BookMarkFillIcon';
import CommentForm from '../CommentForm/CommentForm';
import styles from './ActionBar.module.css';

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};

export default function ActionBar({ post, children, onComment }: Props) {
  const { id, likes, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks?.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };
  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };
  const handleComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image });
  };

  return (
    <>
      <div className={styles.icons}>
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          offIcon={<HeartIcon />}
          onIcon={<HeartFillIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          offIcon={<BookMarkIcon />}
          onIcon={<BookMarkFillIcon />}
        />
      </div>
      <div className={styles.details}>
        <p className={styles.likes}>
          {`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}
        </p>
        {children}
        <p className={styles.date}>{parseDate(createdAt)}</p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
}
