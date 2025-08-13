import { type NextPage } from 'next';
import { AdminLayout } from '@/components/layout/admin-layout';
import { useRouter } from 'next/router';
import { useSearchPosts } from '@/hooks/post-hooks';
import { InfiniteScrollPosts } from '@/components/common/infinite-scroll-posts';

type Props = {};

const Search: NextPage<Props> = () => {
  const router = useRouter();
  const query = router.query.query as string;

  const { posts, loading, updatePosts, refetchPosts } = useSearchPosts(query);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-2">
          Search Results
        </h1>
        <p className="text-primary-600 dark:text-primary-400">
          {query ? `Searching for: "${query}"` : 'Search posts'}
        </p>
      </div>

      {!loading && !posts.length && (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100 mb-2">
            No results found
          </h2>
          <p className="text-primary-600 dark:text-primary-400">
            Try adjusting your search terms
          </p>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100 mb-2">
            Searching...
          </h2>
          <p className="text-primary-600 dark:text-primary-400">
            Please wait while we find your results
          </p>
        </div>
      )}

      {posts.length > 0 && (
        <InfiniteScrollPosts
          deletedPostId={id => {
            updatePosts(prev => ({
              posts: prev.posts.filter(post => post.id !== id),
            }));
            refetchPosts();
          }}
          hasMore={false}
          next={() => {}}
          dataLength={posts.length}
          posts={posts}
          showControls
        />
      )}
    </AdminLayout>
  );
};

export default Search;
