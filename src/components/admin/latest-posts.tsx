import { type FC } from 'react';
import { IPost } from '@/types';
import { BsPlus } from 'react-icons/bs';
import Link from 'next/link';
import dateFormat from 'dateformat';

type Props = {
  posts: IPost[];
};

const LatestPosts: FC<Props> = ({ posts }) => {
  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-primary-900 dark:text-primary-100 mb-1">
            Latest Posts
          </h3>
          <p className="text-primary-600 dark:text-primary-400 text-sm">
            Recently published content
          </p>
        </div>
        
        <Link 
          href="/admin/posts/create" 
          className="btn-primary btn-sm inline-flex items-center space-x-2"
        >
          <BsPlus className="h-4 w-4" />
          <span>New Post</span>
        </Link>
      </div>

      {/* Posts List (simplified) */}
      {posts.length > 0 ? (
        <div className="space-y-3">
          {posts.slice(0, 6).map((post) => {
            const createdAt = typeof post.createdAt === 'string' || typeof post.createdAt === 'number'
              ? new Date(post.createdAt)
              : post.createdAt;
            const authorName = typeof post.author === 'string' ? post.author : post.author?.name;
            return (
              <div key={post.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800">
                <div className="min-w-0">
                  <Link href={`/${post.slug}`} className="group/title">
                    <h4 className="text-base font-semibold text-primary-900 dark:text-primary-100 truncate group-hover/title:text-accent-600 dark:group-hover/title:text-accent-400 transition-colors duration-200">{post.title}</h4>
                  </Link>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-primary-600 dark:text-primary-400">
                    {authorName && <span>By {authorName}</span>}
                    <time dateTime={createdAt.toISOString()}>{dateFormat(createdAt, 'd mmm yyyy')}</time>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link 
                    href={`/admin/posts/${post.slug}`} 
                    className="btn-ghost btn-sm"
                  >
                    Edit
                  </Link>
                  <Link 
                    href="#" 
                    className="btn-ghost btn-sm text-danger-600 dark:text-danger-400"
                    onClick={(e) => { e.preventDefault(); console.log('Delete post:', post.id); }}
                  >
                    Delete
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary-200 dark:bg-primary-700 rounded-full flex items-center justify-center">
            <BsPlus className="w-6 h-6 text-primary-500 dark:text-primary-400" />
          </div>
          <h4 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
            No posts yet
          </h4>
          <p className="text-primary-600 dark:text-primary-400 mb-4">
            Start creating content for your blog
          </p>
          <Link href="/admin/posts/create" className="btn-primary btn-sm">
            Create Your First Post
          </Link>
        </div>
      )}

      {/* View All Link */}
      {posts.length > 0 && (
        <div className="mt-6 text-center">
          <Link 
            href="/admin/posts" 
            className="btn-ghost btn-sm"
          >
            View All Posts
          </Link>
        </div>
      )}
    </div>
  );
};

export { LatestPosts };
