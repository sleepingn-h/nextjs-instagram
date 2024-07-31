'use client';
// NOTE
// 'use client'를 선언한 클라이언트 컴포넌트의 자식 컴포넌트까지 자동적으로 클라이언트 컴포넌트가 되는 경우는
// 해당 자식 컴포넌트를 직접 import한 경우에만 해당
// Context 컴포넌트 경우
// 'use client'를 선언하여 클라이언트 컴포넌트로 사용해야 하지만,
// 자식 컴포넌트를 직접 import 하지 않고 children prop으로 자식을 전달하기 때문에 중첩된 하위 컴포넌트들이
// 서버 컴포넌트로서 기능할 수 있는 것임
// 즉, AuthContext의 상위 컴포넌트로서의 역할은 children이 어디에 위치할지 결정하는 것이고
// children이 어떤 컴포넌트가 될지는(클라이언트 컴포넌트인지, 서버 컴포넌트인지) AuthContext에서는 모르는 상태인 것임
// 공식문서: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#supported-pattern-passing-server-components-to-client-components-as-props
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

export default function AuthContext({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
