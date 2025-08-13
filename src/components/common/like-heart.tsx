import { FC } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

type Props = {
  busy?: boolean;
  label?: string;
  liked?: boolean;
  onClick?: () => void;
};

const LikeHeart: FC<Props> = ({
  liked = false,
  label,
  onClick,
  busy = false,
}): JSX.Element => {
  return (
    <button
      disabled={busy}
      type="button"
      className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 rounded-lg px-2 py-1 hover:bg-primary-100 dark:hover:bg-primary-800"
      onClick={onClick}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {busy ? (
          <div className="w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            {liked ? (
              <BsHeartFill className="w-5 h-5 text-danger-500 dark:text-danger-400" />
            ) : (
              <BsHeart className="w-5 h-5" />
            )}
          </>
        )}
      </div>
      {label && <span className="font-medium">{label}</span>}
    </button>
  );
};

export { LikeHeart };
