# Instangram clone coding

# 0. 프로젝트의 주요 기능과 사용된 기술 스택 설명:

## Google login

Id: jooha099@gmail.com
Password: i0T0XzZrvqWi02D

## 0-1. 사용된 기술 스택

![Next.js](https://img.shields.io/badge/-Nextjs-000000?style=for-the-badge&logo=Next.js&logoColor=ffffff)
![React](https://img.shields.io/badge/-React-222222?style=for-the-badge&logo=react)
![PostCSS](https://img.shields.io/badge/-PostCSS-DD3A0A?style=for-the-badge&logo=PostCSS&logoColor=ffffff)
![Tailwind CSS](https://img.shields.io/badge/-Tailwindcss-06B6D4?style=for-the-badge&logo=Tailwindcss&logoColor=ffffff)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/-NextAuth-9421cf?style=for-the-badge)
![SWR](https://img.shields.io/badge/-Swr-000000?style=for-the-badge&logo=swr&logoColor=white)
![Sanity](https://img.shields.io/badge/-Sanity-F03E2F?style=for-the-badge&logo=Sanity&logoColor=ffffff)
![Git](https://img.shields.io/badge/-Git-F05032?style=for-the-badge&logo=git&logoColor=ffffff)

## 0-2. 하이라이트 코드

### 댓글 Optimistic UI 구현 (SWR + useCallback)

useFullPost 훅은 SWR을 활용하여 포스트 데이터의 상태를 관리하며, 댓글 작성 시 mutate를 통해 Optimistic UI를 구현하였습니다.
댓글이 작성되면 서버 응답 전에 UI에 즉시 반영되며, 실패할 경우 자동으로 롤백되도록 구성했습니다.
또한 globalMutate를 활용하여 전체 포스트 목록의 캐시도 최신화하여 데이터 일관성을 유지했습니다.

```
// src/hooks/post.ts
const postComment = useCallback(
  (comment: Comment) => {
    if (!post) return;

    const newPost = {
      ...post,
      comments: [...post.comments, comment],
    };

    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newPost,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    }).then(() => globalMutate('/api/posts'));
  },
  [post, mutate, globalMutate]
);
```

###Next.js App Router 기반 인증 API 구현
/api/posts API는 withSessionUser 헬퍼를 사용하여 로그인된 사용자만 접근할 수 있도록 구성했습니다.
GET 요청 시 로그인 사용자의 팔로잉 기반 피드를 제공하며, POST 요청은 FormData를 처리하여 텍스트와 이미지 업로드를 동시에 지원합니다.
Next.js 13의 App Router 환경에서 인증, 파일 처리, 에러 핸들링을 통합적으로 구현한 예시입니다.

```
// src/app/api/posts/route.ts
export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const form = await req.formData();
    const text = form.get('text')?.toString();
    const file = form.get('file') as Blob;

    if (!text || !file) {
      return new Response('Bad Request', { status: 400 });
    }

    return createPost(user.id, text, file) //
      .then((data) => NextResponse.json(data));
  });
}

```

# 기능소개

- 로그인 : 구글 계정으로 로그인
  - 검색 페이지를 제외한 모든 페이지는 로그인을 하여야 접근 가능
  - 로그인 하지 않은 사용자가 검색 페이지를 제외한 페이지로 접근시 로그인페이지로 리다이렉트
- 홈화면 :
  - [좌측] 현재 로그인한 사용자가 팔로잉한 유저의 아바타 리스트를 보여줌
  - [좌측]현재 로그인한 사용자 외에도 팔로잉한 유저의 포스트를 보여줌
  - [우측] 현재 로그인한 사용자 정보를 보여줌
- 포스트
  - 포스트를 등록한 유저의 이미지와 아이디
  - 좋아요, 북마크 버튼
  - 코멘트: 작성 및 보여주기
  - 상세보기
- 사용자 검색
  - 전체 사용자
  - 사용자 이름 혹은 아이디로 솔팅
- 포스트 작성
  - 이미지 drag and drop
  - 작성 완료되면 홈으로 리다이렉트
- 유저 페이지
  - 팔로우, 언팔로우 버튼
  - 작성한 포스트
  - 북마크한 포스트
  - 좋아요 누른 포스트
