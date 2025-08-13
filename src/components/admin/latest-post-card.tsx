import Link from 'next/link';
import { type FC } from 'react';

import { useDeletePost } from '@/hooks/post-hooks';
import { trimText } from '@/lib/client-utils';

type Props = {
  id: string;
  title: string;
  meta: string;
  slug: string;
  onDeletePost: (id: string) => void;
};

const LatestPostCard: FC<Props> = ({ title, meta, slug, id, onDeletePost }) => {
  const { deletePost, deleting } = useDeletePost({ onMutate: onDeletePost });

  return (
    <div className="p-4 border border-primary-200 dark:border-primary-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/50 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
        {trimText(title, 50)}
      </h3>
      <p className="text-sm text-primary-600 dark:text-primary-400 mb-4">
        {trimText(meta, 100)}
      </p>

      <div className="flex items-center justify-end space-x-3">
        <Link
          className="text-primary-600 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-200 text-sm font-medium"
          href={`/admin/posts/${slug}`}
        >
          Edit
        </Link>

        <button
          onClick={() => deletePost(id)}
          className="text-danger-600 dark:text-danger-400 hover:text-danger-700 dark:hover:text-danger-300 transition-colors duration-200 text-sm font-medium"
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export { LatestPostCard };
