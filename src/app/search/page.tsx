import { Metadata } from 'next';
import UserSearch from '@/components/User/UserSearch/UserSearch';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'User Search',
  description: 'Search users to follow',
};
export default function SearchPage() {
  return <UserSearch />;
}
