import { IAuthorInfo } from '@/types';
import Image from 'next/image';
import { type FC } from 'react';

type Props = { profile: IAuthorInfo };

const AuthorInfoProfile: FC<Props> = ({ profile }) => {
  const { name, avatar } = profile;
  const message = `This post is written by ${name}. ${
    name.split(' ')[0]
  } is a full stack JavaScript developer.`;

  return (
    <div className="flex items-center rounded-lg border-2 border-primary-200 dark:border-primary-700 p-4 bg-primary-50 dark:bg-primary-800/30">
      <div className="w-12 h-12 flex-shrink-0">
        <div className="relative aspect-square">
          <Image 
            className="rounded-lg object-cover" 
            src={avatar!} 
            alt={name} 
            fill
            sizes="48px"
          />
        </div>
      </div>

      <div className="ml-4 flex-1">
        <h4 className="font-semibold text-primary-900 dark:text-primary-100 mb-1">
          {name}
        </h4>
        <p className="text-primary-600 dark:text-primary-400 text-sm leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};

export { AuthorInfoProfile };
