import { type FC } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import parse from 'html-react-parser';

import { ProfileIcon } from '../common/ui/profile-icon';
import Link from 'next/link';
import { trimText } from '@/lib/client-utils';
import { IComment } from '@/types';

type Props = { comment: IComment };

const LatestCommentCard: FC<Props> = ({ comment }) => {
  comment.belongsTo = comment.belongsTo as { title: string; slug: string };

  return (
    <div className="flex space-x-3 p-3 border border-primary-200 dark:border-primary-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/50 transition-colors duration-200">
      <ProfileIcon
        avatar={comment.owner.avatar}
        nameInitial={comment.owner.name[0].toUpperCase()}
      />

      <div className="flex-1">
        <div className="font-medium text-primary-900 dark:text-primary-100 mb-1">
          {comment.owner.name + ' '}
          <span className="text-sm text-primary-600 dark:text-primary-400">commented on</span>
        </div>

        <Link href={`/${comment.belongsTo.slug}`} target="_blank">
          <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-200 mb-2">
            <BsBoxArrowUpRight size={12} />
            <span className="text-sm font-medium">
              {trimText(comment.belongsTo.title, 30)}
            </span>
          </div>
        </Link>

        <div className="text-sm text-primary-700 dark:text-primary-300 prose prose-sm dark:prose-invert max-w-none">
          {parse(trimText(comment.content, 100))}
        </div>
      </div>
    </div>
  );
};

export { LatestCommentCard };
