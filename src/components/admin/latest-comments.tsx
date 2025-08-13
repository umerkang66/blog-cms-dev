import { type FC } from 'react';
import { useComments } from '@/hooks/comment-hooks';
import { All } from '@/types';
import { LatestCommentCard } from './latest-comment-card';

type Props = {};

const LatestComments: FC<Props> = props => {
  const { comments } = useComments('*' as All, 8);

  return (
    <div className="card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-1">
          Recent Comments
        </h3>
        <p className="text-sm text-primary-600 dark:text-primary-400">
          Latest user comments
        </p>
      </div>
      
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map(comment => (
            <LatestCommentCard comment={comment} key={comment.id} />
          ))
        ) : (
          <div className="text-center py-8 text-primary-500 dark:text-primary-400">
            No comments yet
          </div>
        )}
      </div>
    </div>
  );
};

export { LatestComments };
