import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import { AdminLayout } from '@/components/layout/admin-layout';
import { IPost } from '@/types';
import { getPosts } from '@/lib/server-utils-for-client';
import { InfiniteScrollPosts } from '@/components/common/infinite-scroll-posts';
import { usePaginatedPosts } from '@/hooks/post-hooks';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Posts: NextPage<Props> = ({ posts }) => {
  const { fetchMorePosts, totalPosts, hasMorePosts, updateTotalPosts } =
    usePaginatedPosts({ defaultPosts: posts, limit: 9 });

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-2">
          All Posts
        </h1>
        <p className="text-primary-600 dark:text-primary-400">
          Manage and edit your blog posts
        </p>
      </div>
      
      <InfiniteScrollPosts
        deletedPostId={id =>
          updateTotalPosts(prev => prev.filter(post => post.id !== id))
        }
        hasMore={hasMorePosts}
        next={() => fetchMorePosts({ skip: totalPosts.length })}
        dataLength={totalPosts.length}
        posts={totalPosts}
        showControls
      />
    </AdminLayout>
  );
};

type R = { posts: IPost[] };
export const getServerSideProps: GetServerSideProps<R> = async () => {
  const posts = await getPosts({ page: 1, limit: 9 });
  return { props: { posts } };
};

export default Posts;
