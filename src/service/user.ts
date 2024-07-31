import { SearchUser } from '@/model/user';
import { client } from './sanity';
// https://www.sanity.io/docs/groq

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export async function addUser({ id, username, email, name, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

// 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서
// 3. 백엔드에서 사용자의 상세 정보를 Sanity에서 가지고 옴 (followings)
export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type =='user' && username=="${username}"][0]{
      ...,
      "id": _id,
      following[]->{username, image},
      followers[]->{username, image},
      "bookmarks":bookmarks[]->_id
      }`
  );
}

export async function searchUsers(keyword?: string) {
  const query = keyword ? `&& (name match "${keyword}") ||  (username match "${keyword}")` : '';

  return client
    .fetch(
      `*[_type == "user" ${query}]{
      ...,
      "following": count(following),
      "followers": count(followers)
    }`
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type=="user" && username=="${username}"][0]{
        ...,
        "id": _id,
        "following": count(following),
        "followers": count(followers),
        "posts": count(*[_type=="post" && author->username=="${username}"])
      }`,
      {},
      { cache: 'no-store' }
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId) //
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [
      {
        _ref: postId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}

// https://www.sanity.io/docs/js-client#multiple-mutations-in-a-transaction
export async function follow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, (user) =>
      user
        .setIfMissing({ following: [] })
        .append('following', [{ _ref: targetId, _type: 'reference' }])
    )
    .patch(targetId, (user) =>
      user.setIfMissing({ followers: [] }).append('followers', [{ _ref: myId, _type: 'reference' }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}
