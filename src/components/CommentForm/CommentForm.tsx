import { FormEvent, useState } from 'react';
import Button from '@/components/ui/Button/Button';
import SmileIcon from '@/components/ui/icons/SmileIcon';
import styles from './CommentForm.module.css';

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState('');
  const buttonDisabled = comment.length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <SmileIcon />
      <input
        type='text'
        placeholder='Add a comment'
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button size='small' className={styles.comment} type='submit' disabled={buttonDisabled}>
        post
      </Button>
    </form>
  );
}
