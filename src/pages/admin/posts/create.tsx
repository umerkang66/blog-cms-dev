import type { NextPage } from 'next';
import { Editor } from '@/components/editor';
import { AdminLayout } from '@/components/layout/admin-layout';
import { useCreatePost } from '@/hooks/post-hooks';

type Props = {};

const Create: NextPage<Props> = () => {
  const { createPost, creating } = useCreatePost();

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-2">
          Create New Post
        </h1>
        <p className="text-primary-600 dark:text-primary-400">
          Write and publish a new blog post
        </p>
      </div>
      
      <div className="mx-auto max-w-4xl">
        <Editor btnTitle="Create" busy={creating} onSubmit={createPost} />
      </div>
    </AdminLayout>
  );
};

export default Create;
