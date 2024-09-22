'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import Button from './ui/Button/Button';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string | undefined;
};

export default function Signin({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <Button size='big' key={id} mode='colored' onClick={() => signIn(id, { callbackUrl })}>
          <span>Sign in with {name}</span>
        </Button>
      ))}
      <p>id: jooha099@gmail.com / pw: i0T0XzZrvqWi02D</p>
    </>
  );
}
