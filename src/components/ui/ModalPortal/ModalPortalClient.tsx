import { useEffect, useState } from 'react';
import reactDom from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function ModalPortalClient({ children }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (typeof window === 'undefined') {
    return null;
  }

  const node = document.getElementById('portal') as Element;
  return <>{isClient && reactDom.createPortal(children, node)}</>;
}
