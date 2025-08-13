import Link from 'next/link';
import { type FC } from 'react';
import { HiLightBulb, HiSun, HiMoon } from 'react-icons/hi';

import { Logo } from '../logo';
import { APP_NAME } from '../../app-head';
import { GithubAuthButton } from '../button';
import { ProfileHead } from '../profile-head';
import { Dropdown, type DropdownOption } from '../dropdown';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useDarkMode } from '@/hooks/use-dark-mode';

type Props = {};

const defaultOptions: DropdownOption[] = [
  { label: 'Logout', onClick: signOut },
];

const UserNav: FC<Props> = props => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isAdmin = user?.role === 'admin';

  const router = useRouter();
  const { toggleTheme, isDark } = useDarkMode();

  const dropdownOptions: DropdownOption[] = isAdmin
    ? [
        { label: 'Dashboard', onClick: () => router.push('/admin') },
        ...defaultOptions,
      ]
    : defaultOptions;

  return (
    <nav className="glass dark:glass-dark sticky top-0 z-50 border-b border-primary-200/50 dark:border-primary-700/50">
      <div className="container-responsive">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            className="group flex items-center space-x-3 text-accent-600 transition-all duration-200 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
            href="/"
          >
            <div className="transition-transform duration-200 group-hover:scale-110">
              <Logo className="h-8 w-8 fill-current md:h-10 md:w-10" />
            </div>
            <span className="text-gradient text-xl font-bold md:text-2xl">
              {APP_NAME}
            </span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="group relative rounded-lg bg-primary-100 p-2 transition-all duration-200 hover:scale-110 hover:bg-primary-200 dark:bg-primary-800 dark:hover:bg-primary-700"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              <div className="relative">
                <HiSun
                  className={`h-6 w-6 text-warning-500 transition-all duration-300 ${
                    isDark
                      ? 'rotate-90 scale-0 opacity-0'
                      : 'rotate-0 scale-100 opacity-100'
                  }`}
                />
                <HiMoon
                  className={`absolute inset-0 h-6 w-6 text-primary-600 transition-all duration-300 dark:text-primary-400 ${
                    isDark
                      ? 'rotate-0 scale-100 opacity-100'
                      : '-rotate-90 scale-0 opacity-0'
                  }`}
                />
              </div>
            </button>

            {/* Auth section */}
            {status !== 'loading' && (
              <div className="animate-fade-in">
                {status === 'authenticated' ? (
                  <Dropdown
                    options={dropdownOptions}
                    head={
                      <div className="group">
                        <ProfileHead
                          lightOnly
                          avatar={user?.avatar}
                          nameInitial={user?.avatar ?? user?.name![0]}
                        />
                        <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent-500 opacity-0 transition-all duration-200 group-hover:scale-150 group-hover:opacity-100" />
                      </div>
                    }
                  />
                ) : (
                  <GithubAuthButton lightOnly />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export { UserNav };
