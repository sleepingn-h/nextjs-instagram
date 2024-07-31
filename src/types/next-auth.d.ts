import { AuthUser } from '@/model/user';
import NextAuth, { DefaultSession } from 'next-auth';

// https://next-auth.js.org/getting-started/typescript
declare module 'next-auth' {
  interface Session {
    user: AuthUser;
    // user: {
    //   username: string;
    // } & DefaultSession['user'];
  }
}
