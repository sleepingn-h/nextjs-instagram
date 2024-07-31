import { NextResponse } from 'next/server';
import { withSessionUser } from '@/util/session';
import { getUserByUsername } from '@/service/user';

export async function GET() {
  return withSessionUser(async (user) =>
    getUserByUsername(user.username) //
      .then((data) => NextResponse.json(data))
  );
}
