import { NextRequest, NextResponse } from 'next/server';
import { withSessionUser } from '@/util/session';
import { addBookmark, removeBookmark } from '@/service/user';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, bookmark } = await req.json();

    if (!id || bookmark === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = bookmark ? addBookmark : removeBookmark;

    return request(user.id, id) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
