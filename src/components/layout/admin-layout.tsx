import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlineFileAdd,
} from 'react-icons/ai';
import { AdminNav } from '../common/ui/nav/admin-nav';
import { AppHead } from '../common/app-head';
import { AdminSecondaryNav } from '../common/ui/nav/admin-secondary-nav';

const navItems = [
  { href: '/admin', icon: AiOutlineDashboard, label: 'Dashboard' },
  { href: '/admin/posts', icon: AiOutlineContainer, label: 'Posts' },
  { href: '/admin/users', icon: AiOutlineTeam, label: 'Users' },
  { href: '/admin/comments', icon: AiOutlineMail, label: 'Comments' },
];

const AdminLayout: FC<PropsWithChildren & { title?: string }> = ({
  title,
  children,
}) => {
  return (
    <>
      <AppHead title={title} />
      <div className="flex min-h-screen bg-primary-50 dark:bg-primary-950">
        <AdminNav navItems={navItems} />
        <div className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">
            <AdminSecondaryNav />
            <div className="mt-4">
              {children}
            </div>
          </div>
        </div>
        <Link
          href="/admin/posts/create"
          className="fixed bottom-6 right-6 z-10 rounded-full bg-accent-600 hover:bg-accent-700 p-3 text-white shadow-lg transition-colors duration-200"
          aria-label="Create new post"
        >
          <AiOutlineFileAdd size={24} />
        </Link>
      </div>
    </>
  );
};

export { AdminLayout };
