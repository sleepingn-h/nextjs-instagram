'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from './NavBar.module.css';
import Button from '../../ui/Button/Button';
import HomeIcon from '../../ui/icons/HomeIcon';
import HomeFillIcon from '../../ui/icons/HomeFillIcon';
import SearchIcon from '../../ui/icons/SearchIcon';
import SearchFillIcon from '../../ui/icons/SearchFillIcon';
import NewIcon from '../../ui/icons/NewIcon';
import NewFillIcon from '../../ui/icons/NewFillIcon';
import Avatar from '@/components/Avatar/Avatar';

const menu = [
  {
    name: 'Home',
    href: '/',
    icon: <HomeIcon />,
    fillIcon: <HomeFillIcon />,
  },
  {
    name: 'Search',
    href: '/search',
    icon: <SearchIcon />,
    fillIcon: <SearchFillIcon />,
  },
  {
    name: 'New',
    href: '/new',
    icon: <NewIcon />,
    fillIcon: <NewFillIcon />,
  },
];

export default function NavBar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <Link className={styles.logo} href={'/'}>
          Instantgram
        </Link>
        <nav aria-label='navigation'>
          <ul className={styles.ul}>
            {menu.map(({ name, href, icon, fillIcon }) => (
              <li key={href}>
                <span className='sr-only'>{name}</span>
                <Link href={href}>{pathName === href ? fillIcon : icon}</Link>
              </li>
            ))}
            {user && (
              <li>
                <Link href={`/user/${user.username}`}>
                  <Avatar image={user.image} size='small' highlight />
                </Link>
              </li>
            )}
            <li>
              {session ? (
                <Button size='small' mode='colored' onClick={() => signOut()}>
                  <span>Sign out</span>
                </Button>
              ) : (
                <Button size='small' mode='colored' onClick={() => signIn()}>
                  <span>Sign in</span>
                </Button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
