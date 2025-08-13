import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  type NextPage,
} from 'next';
import { useRouter } from 'next/router';

import { AdminLayout } from '@/components/layout/admin-layout';
import { IPost } from '@/types';
import { Editor, FinalPost } from '@/components/editor';
import { getPost } from '@/lib/server-utils-for-client';
import { useUpdatePost } from '@/hooks/post-hooks';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Update: NextPage<Props> = ({ post }) => {
  const router = useRouter();
  const { updatePost, updating } = useUpdatePost({
    onMutate: () => {
      const path = router.pathname.replace(
        '[slug]',
        router.query.slug as string,
      );

      router.push(path);
    },
  });

  const serializePostTags = (post: IPost): FinalPost => {
    return { ...post, tags: post.tags.join(', ') };
  };

  if (!post) return null;

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-2">
          Edit Post
        </h1>
        <p className="text-primary-600 dark:text-primary-400">
          Update your blog post content and settings
        </p>
      </div>
      
      <div className="mx-auto max-w-4xl">
        <Editor
          initialValue={serializePostTags(post)}
          btnTitle="Update"
          busy={updating}
          onSubmit={updatePost}
        />
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  post: IPost | null;
}> = async context => {
  const slug = context.params?.slug as string;
  const post = await getPost(slug);

  return {
    props: { post },
    notFound: !post,
  };
};

export default Update;
