'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Comment, SimplePost } from '@/model/post';
import usePosts from '@/hooks/posts';
import ActionBar from '@/components/ActionBar/ActionBar';
import Button from '@/components/ui/Button/Button';
import ModalPortal from '@/components/ui/ModalPortal/ModalPortal';
import PostModal from '../PostModal/PostModal';
import PostDetail from '../PostDetail/PostDetail';
import PostUserAvatar from '../PostUserAvatar/PostUserAvatar';
import styles from './PostListCard.module.css';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, text, comments } = post;
  const { postComment } = usePosts();
  const [openModal, setOpenModal] = useState(false);

  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };

  return (
    <>
      <PostUserAvatar userImage={userImage} username={username} />
      <Image
        className={styles.image}
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onComment={handlePostComment}>
        <p className={'description'}>
          <span>{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <Button size='small' className={styles.commentBtn} onClick={() => setOpenModal(true)}>
            <span>View all {comments} comments</span>
          </Button>
        )}
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </>
  );
}
