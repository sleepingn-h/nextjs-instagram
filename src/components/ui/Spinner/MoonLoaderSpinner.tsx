import dynamic from 'next/dynamic';
import styles from './MoonLoaderSpinner.module.css';

const MoonLoader = dynamic(() => import('react-spinners').then((lib) => lib.MoonLoader), {
  ssr: false,
});

type Props = {
  color?: string;
  type?: boolean;
};

export default function MoonLoaderSpinner({ color = '#f43f5e', type }: Props) {
  return (
    <div className={`${styles.loading} ${type && styles.pop}`}>
      <MoonLoader color={color} />
    </div>
  );
}
