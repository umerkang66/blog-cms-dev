import { IUser } from '@/types';
import Image from 'next/image';
import { useCallback, type FC } from 'react';

type Props = {
  lightOnly?: boolean;
  avatar?: string;
  nameInitial?: string;
  email?: string;
  user?: IUser;
};

const ProfileIcon: FC<Props> = ({ lightOnly, avatar, nameInitial }) => {
  const getColors = useCallback(() => {
    return lightOnly
      ? 'text-primary-100 bg-accent-600'
      : 'bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-300';
  }, [lightOnly]);

  return (
    <div
      className={`relative flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full font-semibold text-sm ${getColors()}`}
    >
      {avatar ? (
        <Image 
          src={avatar} 
          alt="Profile" 
          fill
          className="object-cover"
          sizes="40px"
        />
      ) : (
        <span className="uppercase">{nameInitial}</span>
      )}
    </div>
  );
};

export { ProfileIcon };
