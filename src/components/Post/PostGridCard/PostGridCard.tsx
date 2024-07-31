import { useState } from 'react';
import Image from 'next/image';
import { SimplePost } from '@/model/post';
import ModalPortal from '@/components/ui/ModalPortal/ModalPortal';
import PostModal from '../PostModal/PostModal';
import PostDetail from '../PostDetail/PostDetail';
import styles from './PostGridCard.module.css';
import { signIn, useSession } from 'next-auth/react';

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostGridCard({ post, priority = false }: Props) {
  const { image, username } = post;
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();

  const handleOpenPost = () => {
    if (!session?.user) {
      return signIn();
    }

    setOpenModal(true);
  };

  return (
    <div className={styles.grid}>
      <Image
        className={styles.image}
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes='650px'
        priority={priority}
        onClick={handleOpenPost}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
