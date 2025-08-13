import type {
  GetStaticProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import { InfiniteScrollPosts } from '@/components/common/infinite-scroll-posts';
import { DefaultLayout } from '@/components/layout/default-layout';
import type { IPost } from '@/types';
import { getPosts } from '@/lib/server-utils-for-client';
import { usePaginatedPosts } from '@/hooks/post-hooks';
import { useUser } from '@/hooks/use-user';
import Link from 'next/link';

type Props = InferGetServerSidePropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ posts }) => {
  const { user } = useUser();
  const isAdmin = user?.role === 'admin';

  const { fetchMorePosts, totalPosts, hasMorePosts, updateTotalPosts } =
    usePaginatedPosts({ defaultPosts: posts, limit: 9 });

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950">
        <section className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-accent-200/20 blur-3xl dark:bg-accent-800/20"></div>
            <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-primary-200/20 blur-3xl dark:bg-primary-800/20"></div>
          </div>
        </section>

        <section className="py-16">
          <div className="mb-12">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-primary-900 dark:text-primary-100 md:text-4xl">
                  Latest Posts
                </h2>
                <p className="text-primary-600 dark:text-primary-300">
                  Explore our collection of thoughtfully crafted content
                </p>
              </div>

              {isAdmin && (
                <div className="flex items-center space-x-2 text-sm text-primary-500 dark:text-primary-400">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-accent-500"></div>
                  <span>Admin Mode</span>
                </div>
              )}
            </div>
          </div>

          <InfiniteScrollPosts
            deletedPostId={id =>
              updateTotalPosts(prev => prev.filter(post => post.id !== id))
            }
            hasMore={hasMorePosts}
            next={() => fetchMorePosts({ skip: totalPosts.length })}
            dataLength={totalPosts.length}
            posts={totalPosts}
            showControls={isAdmin}
          />

          {totalPosts.length === 0 && (
            <div className="py-16 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary-200 dark:bg-primary-700">
                <svg
                  className="h-12 w-12 text-primary-500 dark:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-primary-900 dark:text-primary-100">
                No posts yet
              </h3>
              <p className="mb-6 text-primary-600 dark:text-primary-400">
                Be the first to share your story with the community
              </p>
              {isAdmin && (
                <Link href="/admin/posts/create" className="btn-primary">
                  Create Your First Post
                </Link>
              )}
            </div>
          )}
        </section>
      </div>
    </DefaultLayout>
  );
};

type R = { posts: IPost[] };

export const getStaticProps: GetStaticProps<R> = async () => {
  return { props: { posts: await getPosts({ page: 1, limit: 9 }) } };
};

export default Home;
