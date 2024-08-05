'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ModalPortalClient from '../ui/ModalPortal/ModalPortalClient';
import ReadMeModal from './ReadMeModal/ReadMeModal';

type Props = {
  content: string;
};

export default function ReadMe({ content }: Props) {
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    setOpenModal(true);
  }, []);

  return (
    <>
      {openModal && (
        <ModalPortalClient>
          <ReadMeModal onClose={() => setOpenModal(false)}>
            <ReactMarkdown className='prose lg:prose-xl max-w-full' remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </ReadMeModal>
        </ModalPortalClient>
      )}
    </>
  );
}
