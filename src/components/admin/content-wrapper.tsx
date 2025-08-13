import { type FC, ReactNode } from 'react';
import { BsBarChart, BsPeople, BsFileText, BsChat } from 'react-icons/bs';

type Props = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  stats?: {
    posts: number;
    users: number;
    comments: number;
    views?: number;
  };
};

const ContentWrapper: FC<Props> = ({ children, title, subtitle, stats }) => {
  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-950">
      <div className="py-6">
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-6">
            {title && (
              <h1 className="text-2xl md:text-3xl font-semibold text-primary-900 dark:text-primary-100 mb-2">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-base text-primary-600 dark:text-primary-400">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Posts Stats */}
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">
                    Total Posts
                  </p>
                  <p className="text-xl font-semibold text-primary-900 dark:text-primary-100">
                    {stats.posts.toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                  <BsFileText className="h-5 w-5 text-accent-600 dark:text-accent-400" />
                </div>
              </div>
            </div>

            {/* Users Stats */}
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">
                    Active Users
                  </p>
                  <p className="text-xl font-semibold text-primary-900 dark:text-primary-100">
                    {stats.users.toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-primary-100 dark:bg-primary-800 rounded-lg">
                  <BsPeople className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </div>

            {/* Comments Stats */}
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">
                    Comments
                  </p>
                  <p className="text-xl font-semibold text-primary-900 dark:text-primary-100">
                    {stats.comments.toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-primary-100 dark:bg-primary-800 rounded-lg">
                  <BsChat className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </div>

            {/* Views Stats */}
            {stats.views !== undefined && (
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">
                      Total Views
                    </p>
                    <p className="text-xl font-semibold text-primary-900 dark:text-primary-100">
                      {stats.views.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2 bg-primary-100 dark:bg-primary-800 rounded-lg">
                    <BsBarChart className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export { ContentWrapper };
