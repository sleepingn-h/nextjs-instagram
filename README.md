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

### App Router 기반 FormData 업로드 구현 및 인증처리
/api/posts API는 withSessionUser 헬퍼를 사용하여 로그인된 사용자만 접근할 수 있도록 구성했습니다.
GET 요청 시 로그인 사용자의 팔로잉 기반 피드를 제공하며, POST 요청은 FormData를 처리하여 텍스트와 이미지 업로드를 동시에 지원합니다.
Next.js 13의 App Router 환경에서 인증, 파일 처리, 에러 핸들링을 통합적으로 구현한 예시입니다.

```
// src/app/api/posts/route.ts
export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const form = await req.formData()
    const text = form.get('text')?.toString()
    const file = form.get('file') as Blob

    if (!text || !file) {
      return new Response('Bad Request', { status: 400 })
    }

    // 서버 로직 (예: 이미지 업로드 + DB 저장)
    return createPost(user.id, text, file)
      .then((data) => NextResponse.json(data))
  })
}
```

# 기능소개
# 1. 클라이언트 구현 안내

## Assignment 1 - Login

- Google 계정으로 로그인 기능을 구현합니다  
  - [ ] Google 로그인 버튼을 제공합니다  
  - [ ] 로그인 성공 시 사용자 정보를 저장하고 루트 경로(`/`)로 이동합니다

- 페이지 접근 제어를 구현합니다  
  - [ ] `/search` 페이지를 제외한 모든 페이지는 로그인한 사용자만 접근할 수 있습니다  
  - [ ] 로그인하지 않은 사용자가 접근 시 `/auth/login`으로 리다이렉트 되도록 설정해주세요

---

## Assignment 2 - 홈 화면

- `/` 루트 경로에서 홈 화면을 구현합니다  
  - [ ] 로그인하지 않은 사용자는 접근할 수 없으며, 로그인 페이지로 이동해야 합니다

### 좌측 영역

- [ ] 현재 로그인한 사용자가 팔로잉한 유저들의 아바타 리스트를 보여줍니다  
- [ ] 팔로잉한 유저들의 포스트 목록을 시간순으로 정렬하여 보여줍니다

### 우측 영역

- [ ] 현재 로그인한 사용자 정보 (프로필 이미지, 이름, 아이디 등)를 보여줍니다

---

## Assignment 3 - 포스트 기능

### 포스트 카드

- [ ] 포스트를 등록한 유저의 프로필 이미지, 아이디를 표시합니다  
- [ ] 포스트의 메인 이미지, 설명을 표시합니다  
- [ ] 좋아요(하트) 버튼을 제공합니다
  - [ ] 누르면 좋아요 상태 토글 및 숫자 갱신
- [ ] 북마크 버튼을 제공합니다
  - [ ] 누르면 북마크 상태 토글

### 댓글 기능

- [ ] 댓글 작성 input을 제공하고, 작성 시 POST 요청을 통해 서버에 저장합니다  
- [ ] 작성된 댓글 목록을 실시간으로 표시합니다

---

## Assignment 4 - 포스트 상세 페이지

- `/post/:id` 경로에서 포스트 상세 페이지를 구현합니다  
  - [ ] 포스트 작성자의 정보, 이미지, 설명을 보여줍니다  
  - [ ] 댓글 목록과 작성 기능을 포함합니다  
  - [ ] 좋아요 / 북마크 상태를 확인하고 토글할 수 있어야 합니다

---

## Assignment 5 - 사용자 검색

- `/search` 경로에서 사용자 검색 기능을 구현합니다  
  - [ ] 로그인하지 않아도 접근 가능한 유일한 페이지입니다  
  - [ ] 전체 사용자의 목록을 보여줍니다  
  - [ ] 사용자 이름 또는 아이디 기준으로 필터링 또는 정렬이 가능해야 합니다

---

## Assignment 6 - 포스트 작성

- `/upload` 페이지에서 포스트 작성 기능을 구현합니다  
  - [ ] 이미지 파일을 Drag & Drop 또는 클릭 업로드로 추가할 수 있어야 합니다  
  - [ ] 설명 텍스트 입력 필드를 제공합니다  
  - [ ] 작성 완료 후 등록 버튼 클릭 시 업로드 완료 및 루트 경로(`/`)로 리다이렉트 됩니다

---

## Assignment 7 - 유저 페이지

- `/user/:username` 경로에서 유저 프로필 페이지를 구현합니다  
  - [ ] 해당 유저의 프로필 정보와 함께 아래 기능을 포함합니다

### 팔로우 기능

- [ ] 현재 로그인한 사용자가 해당 유저를 팔로우/언팔로우할 수 있는 버튼을 제공합니다  
- [ ] 버튼 클릭 시 즉시 반영되도록 구현해주세요

### 탭별 포스트

- [ ] **작성한 포스트** 목록 탭
- [ ] **북마크한 포스트** 목록 탭
- [ ] **좋아요 누른 포스트** 목록 탭  
  - [ ] 각 탭은 선택된 항목에 따라 포스트 목록을 갱신합니다

---

# 2. API 스펙

## [Posts](#posts)

- [getPosts](#getPosts)  
- [getPostById](#getPostById)  
- [createPost](#createPost)  
- [toggleLike](#toggleLike)  
- [toggleBookmark](#toggleBookmark)  

## [Comments](#comments)

- [createComment](#createComment)  
- [getComments](#getComments)  

## [Users](#users)

- [getUserInfo](#getUserInfo)  
- [getAllUsers](#getAllUsers)  
- [toggleFollow](#toggleFollow)  

## [Auth](#auth)

- [loginWithGoogle](#loginWithGoogle)  
- [getSession](#getSession)  

---

## <span id="getPosts">1-1) getPosts</span>

- **GET** `/api/post`
- Headers  
  - Authorization: login token

### 응답 예시

```json
{
  "posts": [
    {
      "id": "abc123",
      "image": "https://...",
      "description": "설명입니다",
      "likes": 12,
      "bookmarks": 3,
      "user": {
        "id": "user123",
        "name": "홍길동",
        "image": "https://..."
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## <span id="getPostById">1-2) getPostById</span>

- **GET** `/api/post/:id`  
- Headers  
  - Authorization: login token

---

## <span id="createPost">1-3) createPost</span>

- **POST** `/api/post`
- Headers  
  - Authorization: login token
- FormData:
  - image: File
  - description: string

---

## <span id="toggleLike">1-4) toggleLike</span>

- **POST** `/api/like`
- Body:
  - postId: string

---

## <span id="toggleBookmark">1-5) toggleBookmark</span>

- **POST** `/api/bookmark`
- Body:
  - postId: string

---

## <span id="createComment">2-1) createComment</span>

- **POST** `/api/comment`
- Body:
  - postId: string
  - comment: string

---

## <span id="getComments">2-2) getComments</span>

- **GET** `/api/comment/:postId`

---

## <span id="getUserInfo">3-1) getUserInfo</span>

- **GET** `/api/user/:username`

---

## <span id="getAllUsers">3-2) getAllUsers</span>

- **GET** `/api/user/all`

---

## <span id="toggleFollow">3-3) toggleFollow</span>

- **POST** `/api/follow`
- Body:
  - targetUserId: string

---

## <span id="loginWithGoogle">4-1) loginWithGoogle</span>

- **GET** `/api/auth/google`
- 동작: Google OAuth를 통해 로그인 세션을 발급받습니다

---

## <span id="getSession">4-2) getSession</span>

- **GET** `/api/session`
- 동작: 현재 로그인 상태인지 확인합니다

```json
{
  "user": {
    "id": "user123",
    "name": "홍길동",
    "email": "hong@test.com",
    "image": "https://..."
  }
}
```
