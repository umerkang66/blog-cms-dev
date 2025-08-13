import { type FC } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { ContentWrapper } from '@/components/admin/content-wrapper';
import { LatestPosts } from '@/components/admin/latest-posts';
import { LatestComments } from '@/components/admin/latest-comments';
import { LatestUsersTable } from '@/components/admin/latest-users-table';
import { usePosts } from '@/hooks/post-hooks';
import { useUsers } from '@/hooks/user-hooks';
import Link from 'next/link';

const AdminDashboard: FC = () => {
  const { posts } = usePosts({ defaultPosts: [] });
  const { users } = useUsers(10);

  return (
    <AdminLayout>
      <ContentWrapper
        title="Dashboard"
        subtitle="Manage your blog content and users"
      >
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Latest Posts */}
          <div className="lg:col-span-2">
            <LatestPosts posts={posts.slice(0, 6)} />
          </div>

          {/* Latest Comments */}
          <div>
            <LatestComments />
          </div>

          {/* Latest Users */}
          <div>
            <LatestUsersTable users={users.slice(0, 5)} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="mb-4 text-xl font-semibold text-primary-900 dark:text-primary-100">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Link
              href="/admin/posts/create"
              className="group rounded-lg border border-primary-200 bg-white p-4 transition-colors duration-200 hover:border-accent-300 dark:border-primary-700 dark:bg-primary-800 dark:hover:border-accent-600"
            >
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-accent-100 p-2 dark:bg-accent-800">
                  <svg
                    className="h-6 w-6 text-accent-600 dark:text-accent-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-900 dark:text-primary-100">
                    Create Post
                  </h4>
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    Write a new blog post
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/users"
              className="group rounded-lg border border-primary-200 bg-white p-4 transition-colors duration-200 hover:border-primary-300 dark:border-primary-700 dark:bg-primary-800 dark:hover:border-primary-600"
            >
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-primary-100 p-2 dark:bg-primary-700">
                  <svg
                    className="h-6 w-6 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-900 dark:text-primary-100">
                    Manage Users
                  </h4>
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    View and manage user accounts
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/comments"
              className="group rounded-lg border border-primary-200 bg-white p-4 transition-colors duration-200 hover:border-primary-300 dark:border-primary-700 dark:bg-primary-800 dark:hover:border-primary-600"
            >
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-primary-100 p-2 dark:bg-primary-700">
                  <svg
                    className="h-6 w-6 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-900 dark:text-primary-100">
                    Moderate Comments
                  </h4>
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    Review and manage comments
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </ContentWrapper>
    </AdminLayout>
  );
};

export default AdminDashboard;
