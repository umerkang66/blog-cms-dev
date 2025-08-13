import Link from 'next/link';
import { useEffect, useState, type FC } from 'react';
import { type IconType } from 'react-icons';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { Logo } from '../logo';

type Props = { navItems: { href: string; icon: IconType; label: string }[] };

const NAV_OPEN_WIDTH = 'w-60';
const NAV_CLOSE_WIDTH = 'w-12';
const NAV_VISIBILITY_KEY = 'nav-visibility';

const AdminNav: FC<Props> = ({ navItems }) => {
  const [showFullNav, setShowFullNav] = useState(true);

  useEffect(() => {
    const storedState = localStorage.getItem(NAV_VISIBILITY_KEY);
    if (storedState) setShowFullNav(JSON.parse(storedState));
  }, []);

  const renderNavItems = () => {
    return navItems.map(({ href, icon, label }) => {
      const Icon = icon;
      return (
        <Tippy key={href} content={label}>
          <Link
            href={href}
            className={`flex items-center ${
              showFullNav ? 'justify-start p-3 mx-2' : 'justify-center p-2 mx-0'
            } text-lg text-primary-600 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors duration-200 rounded-lg`}
          >
            <Icon size={20} />
            {showFullNav && <span className="ml-3 leading-none font-medium">{label}</span>}
          </Link>
        </Tippy>
      );
    });
  };

  const toggleFullNav = () => {
    setShowFullNav(prevState => {
      const newState = !prevState;
      localStorage.setItem(NAV_VISIBILITY_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <nav
      className={`h-screen ${
        showFullNav ? NAV_OPEN_WIDTH : NAV_CLOSE_WIDTH
      } sticky top-0 flex flex-col justify-between overflow-hidden bg-white dark:bg-primary-900 border-r border-primary-200 dark:border-primary-700 transition-all duration-300`}
    >
      <div>
        <Link href="/admin" className={`mb-8 flex items-center ${showFullNav ? 'space-x-3 p-4' : 'justify-center p-4'}`}>
          <Logo className="h-6 w-6 fill-accent-600 dark:fill-accent-400" />
          {showFullNav && (
            <span className="text-lg font-semibold leading-none text-accent-600 dark:text-accent-400">
              Admin
            </span>
          )}
        </Link>

        <div className={showFullNav ? 'px-2' : 'px-1'}>{renderNavItems()}</div>
      </div>

      <button
        className={`text-primary-600 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors duration-200 rounded-lg mb-4 ${
          showFullNav ? 'self-end p-3 mx-2' : 'self-center p-2 mx-0'
        }`}
        onClick={toggleFullNav}
      >
        {showFullNav ? (
          <RiMenuFoldFill size={20} />
        ) : (
          <RiMenuUnfoldFill size={20} />
        )}
      </button>
    </nav>
  );
};

export { AdminNav };
