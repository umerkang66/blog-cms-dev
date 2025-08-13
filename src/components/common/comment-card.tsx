import { PropsWithChildren, type FC, useState } from 'react';
import dateFormat from 'dateformat';
import parse from 'html-react-parser';
import {
  BsBoxArrowUpRight,
  BsFillReplyAllFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsHeart,
  BsHeartFill,
} from 'react-icons/bs';

export type FinalReply = { content: string; repliedTo: string };

import { IComment } from '@/types';
import { ProfileIcon } from './ui/profile-icon';
import { CommentForm } from './comment-form';
import { useUser } from '@/hooks/use-user';
import {
  useDeleteComment,
  useEditComment,
  useLikeComment,
} from '@/hooks/comment-hooks';
import Link from 'next/link';
import { trimText } from '@/lib/client-utils';

type Props = {
  comment: IComment;
  isRepliesShown?: boolean;
  placeholder?: string;
  refetchComments?: () => void;
  createReply?: (reply: FinalReply) => Promise<any>;
  onDelete: (commentId: string, repliedTo?: string | null) => void;
  showWhichReplies?: (commentId: string) => void;
  busy?: boolean;
  whichCommentBusyOnReplying?: (commentId: string | null) => void;
};

const CommentCard: FC<Props> = ({
  comment,
  placeholder,
  refetchComments,
  createReply,
  onDelete,
  showWhichReplies,
  whichCommentBusyOnReplying,
  busy,
  isRepliesShown,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formBtnTitle, setFormBtnTitle] = useState('Submit');

  const [initialState, setInitialState] = useState('');
  const [content, setContent] = useState(comment.content);
  const [likes, setLikes] = useState(comment.likes);
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(
    comment.likedByCurrentUser,
  );

  const { user } = useUser();
  const isAdmin = user?.role === 'admin';

  const { updateComment, updating } = useEditComment({
    commentId: comment.id,
    onMutate: comment => {
      setContent(comment!.content);
      refetchComments && refetchComments();
      hideForm();
    },
  });

  const { deleteComment, deleting } = useDeleteComment({
    onMutate: commentId => {
      onDelete(commentId, comment.repliedTo);
      refetchComments && refetchComments();
    },
  });

  const { updateLike, liking } = useLikeComment({
    onMutate: data => {
      setLikes(data.likes);
      setLikedByCurrentUser(data.likedByCurrentUser);
      refetchComments && refetchComments();
    },
  });

  const displayForm = () => setShowForm(true);
  const hideForm = () => {
    setShowForm(false);
    setFormBtnTitle('Submit');
  };

  const handleOnReplyClick = () => {
    setFormBtnTitle('Add Reply');
    setInitialState('');
    displayForm();
  };

  const handleOnEditClick = () => {
    setFormBtnTitle('Edit');
    setInitialState(content);
    displayForm();
  };

  const handleOnSubmit = async (content: string) => {
    if (!initialState) {
      whichCommentBusyOnReplying && whichCommentBusyOnReplying(comment.id);
      const reply: FinalReply = { content, repliedTo: comment.id };
      await (createReply && createReply(reply));
      whichCommentBusyOnReplying && whichCommentBusyOnReplying(null);
      return hideForm();
    }
    updateComment(content);
  };

  const onLikeClick = () => {
    if (!user || !user.id) return;
    updateLike(comment.id);
  };

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
    <div className="group animate-fade-in">
      <div className="flex items-start space-x-4 p-4 rounded-xl bg-white dark:bg-primary-900 border border-primary-200 dark:border-primary-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200">
        {/* Profile Icon */}
        <div className="flex-shrink-0">
          <ProfileIcon
            nameInitial={
              comment.owner.avatar ? undefined : comment.owner.name[0].toUpperCase()
            }
            avatar={comment.owner.avatar}
          />
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                  {comment.owner.name}
                </h3>
                {comment.owner.role === 'admin' && (
                  <span className="badge badge-primary text-xs">
                    Admin
                  </span>
                )}
              </div>
              
              {isAdmin && (
                <p className="text-sm text-primary-500 dark:text-primary-400">
                  {comment.owner.email}
                </p>
              )}
            </div>
            
            <time 
              dateTime={getDateString(comment.createdAt)} 
              className="text-sm text-primary-500 dark:text-primary-400 font-medium flex-shrink-0"
            >
              {formatDate(comment.createdAt)}
            </time>
          </div>

          {/* Reply Context */}
          {comment.belongsTo !== null && typeof comment.belongsTo !== 'string' && (
            <div className="mb-3 p-3 bg-primary-50 dark:bg-primary-800/30 rounded-lg border border-primary-200 dark:border-primary-700">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-primary-600 dark:text-primary-400 font-medium">
                  Replying to:
                </span>
                <Link
                  className="inline-flex items-center space-x-2 text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors duration-200"
                  href={`/${comment.belongsTo.slug}`}
                  target="_blank"
                >
                  <BsBoxArrowUpRight className="h-3 w-3" />
                  <span className="font-medium">
                    {trimText(comment.belongsTo.title, 40)}
                  </span>
                </Link>
              </div>
            </div>
          )}

          {/* Comment Text */}
          <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
            {parse(content)}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 text-sm">
            {/* Like Button */}
            <button
              onClick={onLikeClick}
              disabled={liking || !user}
              className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                likedByCurrentUser
                  ? 'text-danger-600 dark:text-danger-400 bg-danger-50 dark:bg-danger-900/20'
                  : 'text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800'
              } ${!user ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              aria-label={`${likedByCurrentUser ? 'Unlike' : 'Like'} comment`}
            >
              {likedByCurrentUser ? (
                <BsHeartFill className="h-4 w-4" />
              ) : (
                <BsHeart className="h-4 w-4" />
              )}
              <span className="font-medium">
                {likes.length} {likes.length === 1 ? 'like' : 'likes'}
              </span>
            </button>

            {/* Show/Hide Replies */}
            {comment.chiefComment && (
              <button
                onClick={() => showWhichReplies && showWhichReplies(comment.id)}
                className="btn-ghost btn-sm"
              >
                {isRepliesShown ? 'Hide' : 'Show'} Replies
              </button>
            )}

            {/* Reply Button */}
            {!!user && !!createReply && comment.chiefComment && (
              <button onClick={handleOnReplyClick} className="btn-ghost btn-sm">
                <BsFillReplyAllFill className="h-4 w-4" />
                Reply
              </button>
            )}

            {/* Edit/Delete (Owner Only) */}
            {comment.ownedByCurrentUser && (
              <>
                <button onClick={handleOnEditClick} className="btn-ghost btn-sm">
                  <BsPencilSquare className="h-4 w-4" />
                  Edit
                </button>

                <button
                  disabled={deleting}
                  onClick={() => deleteComment(comment.id)}
                  className="btn-ghost btn-sm text-danger-600 dark:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-900/20"
                  aria-label="Delete comment"
                >
                  <BsFillTrashFill className="h-4 w-4" />
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </>
            )}
          </div>

          {/* Reply Form */}
          {showForm && (
            <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-800/30 rounded-lg border border-primary-200 dark:border-primary-700">
              <CommentForm
                btnTitle={formBtnTitle}
                onClose={hideForm}
                onSubmit={handleOnSubmit}
                initialState={initialState}
                busy={busy || updating}
                placeholder={placeholder}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CCButton: FC<
  PropsWithChildren<{ onClick?: () => void; busy?: boolean }>
> = ({ children, onClick, busy = false }) => {
  return (
    <button
      disabled={busy}
      onClick={onClick}
      className="btn-ghost btn-sm"
    >
      {children}
    </button>
  );
};

export { CommentCard };
