import Image from 'next/image';
import { type FC } from 'react';
import { IAuthorInfo, IPost } from '@/types';
import dateFormat from 'dateformat';
import Link from 'next/link';
import { trimText } from '@/lib/client-utils';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { ProfileIcon } from './ui/profile-icon';
import { useUser } from '@/hooks/use-user';

type Props = {
  post: IPost;
  controls?: boolean;
  onDelete?: (id: string) => void;
};

const PostCard: FC<Props> = ({ post, controls = false, onDelete }) => {
  const { id, title, slug, meta, tags, thumbnail, createdAt } = post;

  const { user } = useUser();
  const authorId =
    typeof post.author === 'string'
      ? post.author
      : (post.author as IAuthorInfo)?.id;
  const canControl = Boolean(controls && user && authorId && user.id === authorId);

  // Handle different date types
  const formatDate = (date: string | number | Date) => {
    if (typeof date === 'string') {
      return dateFormat(new Date(date), 'd mmm yyyy');
    }
    if (typeof date === 'number') {
      return dateFormat(new Date(date), 'd mmm yyyy');
    }
    return dateFormat(date, 'd mmm yyyy');
  };

  const getDateString = (date: string | number | Date) => {
    if (typeof date === 'string') {
      return new Date(date).toISOString();
    }
    if (typeof date === 'number') {
      return new Date(date).toISOString();
    }
    return date.toISOString();
  };

  return (
    <div className="group card card-hover overflow-hidden animate-fade-in">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-800 dark:to-primary-900">
        {thumbnail && thumbnail.url ? (
          <Image 
            src={thumbnail.url} 
            alt={`Thumbnail for ${title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary-200 dark:bg-primary-700 flex items-center justify-center">
                <svg className="h-6 w-6 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-primary-500 dark:text-primary-400">No Image</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Tags and Date */
        }
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, i) => (
              <span 
                key={tag + i} 
                className="badge badge-primary text-xs px-2 py-1"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="badge badge-primary text-xs px-2 py-1">
                +{tags.length - 3}
              </span>
            )}
          </div>
          <time 
            dateTime={getDateString(createdAt)} 
            className="text-sm text-primary-500 dark:text-primary-400 font-medium"
          >
            {formatDate(createdAt)}
          </time>
        </div>

        {/* Author */}
        {typeof post.author === 'object' && (post.author as IAuthorInfo)?.name && (
          <div className="mb-4 flex items-center gap-3">
            <ProfileIcon
              avatar={(post.author as IAuthorInfo)?.avatar}
              nameInitial={(post.author as IAuthorInfo)?.name?.[0]}
            />
            <span className="text-sm text-primary-700 dark:text-primary-300 font-medium">
              {(post.author as IAuthorInfo).name}
            </span>
          </div>
        )}

        {/* Title */}
        <Link href={`/${slug}`} className="group/title">
          <h2 className="mb-3 text-xl font-bold text-primary-900 dark:text-primary-100 leading-tight group-hover/title:text-accent-600 dark:group-hover/title:text-accent-400 transition-colors duration-200 line-clamp-2">
            {trimText(title, 60)}
          </h2>
        </Link>

        {/* Meta Description */}
        <p className="mb-6 text-primary-600 dark:text-primary-300 leading-relaxed line-clamp-3 flex-1">
          {trimText(meta, 120)}
        </p>

        {/* Controls */}
        {canControl && (
          <div className="mt-auto pt-4 border-t border-primary-200 dark:border-primary-700">
            <div className="flex items-center justify-end gap-3">
              <Link 
                href={`/admin/posts/${slug}`} 
                className="btn-ghost btn-sm inline-flex items-center gap-2 hover:bg-accent-50 dark:hover:bg-accent-900/20 hover:text-accent-600 dark:hover:text-accent-400"
              >
                <BsPencil className="h-4 w-4" />
                Edit
              </Link>
              <button
                onClick={() => onDelete && onDelete(id)}
                className="btn-ghost btn-sm inline-flex items-center gap-2 hover:bg-danger-50 dark:hover:bg-danger-900/20 hover:text-danger-600 dark:hover:text-danger-400"
                aria-label={`Delete post: ${title}`}
              >
                <BsTrash className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { PostCard };
