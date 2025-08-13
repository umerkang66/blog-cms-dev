import { signIn } from 'next-auth/react';
import { useCallback, type FC } from 'react';
import { AiFillGithub } from 'react-icons/ai';

type Props = { lightOnly?: boolean };

const GithubAuthButton: FC<Props> = ({ lightOnly }) => {
  const getColors = useCallback(() => {
    return lightOnly
      ? 'bg-accent-600 hover:bg-accent-700 text-white shadow-soft hover:shadow-glow'
      : 'bg-primary-100 hover:bg-primary-200 dark:bg-primary-800 dark:hover:bg-primary-700 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700';
  }, [lightOnly]);

  return (
    <button
      className={`inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 ${getColors()}`}
      onClick={() => signIn('github')}
    >
      <span className="font-medium">Continue with</span>
      <AiFillGithub className="h-5 w-5" />
    </button>
  );
};

export { GithubAuthButton };
