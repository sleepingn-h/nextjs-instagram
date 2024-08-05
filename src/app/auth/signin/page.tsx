import { getServerSession } from 'next-auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getReadMe } from '@/service/user';
import Signin from '@/components/Signin';
import styles from './page.module.css';
import ReadMe from '@/components/ReadMe/ReadMe';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign up or Login to Instantgram',
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function SigninPage({ searchParams: { callbackUrl } }: Props) {
  const session = await getServerSession(authOptions);
  const { content } = await getReadMe();

  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <>
      <section className={styles.section}>
        <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
      </section>
      <ReadMe content={content} />
    </>
  );
}
