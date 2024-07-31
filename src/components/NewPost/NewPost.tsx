'use client';

import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from 'react';
import { AuthUser } from '@/model/user';
import PostUserAvatar from '../Post/PostUserAvatar/PostUserAvatar';
import FilesIcon from '../ui/icons/FilesIcon';
import Button from '../ui/Button/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MoonLoaderSpinner from '../ui/Spinner/MoonLoaderSpinner';
import styles from './NewPost.module.css';

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();

    formData.append('file', file);
    formData.append('text', textRef.current?.value ?? '');

    fetch('/api/posts/', { method: 'POST', body: formData }) //
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }

        router.push('/');
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  return (
    <section className={styles.section}>
      {loading && <MoonLoaderSpinner type color='#fcd34d' />}
      {error && <p className={styles.error}>{error}</p>}
      <PostUserAvatar username={username} userImage={image ?? ''} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className='hidden'
          name='input'
          id='input-upload'
          type='file'
          accept='image/*'
          onChange={handleChange}
        />
        <label
          className={`${styles.label} ${!file ? styles.empty : ''}`}
          htmlFor='input-upload'
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && <div className={styles.dragging} />}
          {!file && (
            <div className={styles.file}>
              <FilesIcon />
              Drag and Drop your image here or click
            </div>
          )}
          {file && (
            <div className={styles.imageViewer}>
              <Image
                className={styles.image}
                src={URL.createObjectURL(file)}
                alt={'local file'}
                sizes='650px'
                fill
              />
            </div>
          )}
        </label>
        <textarea
          className={styles.textarea}
          name='text'
          id='input-text'
          required
          rows={10}
          placeholder='Write a caption...'
          ref={textRef}
        />
        <Button size='small' mode='basic' type='submit' className={styles.button}>
          Publish
        </Button>
      </form>
    </section>
  );
}
