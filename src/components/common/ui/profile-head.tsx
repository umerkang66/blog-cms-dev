import Image from 'next/image';
import { useCallback, type FC } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { ProfileIcon } from './profile-icon';

type Props = {
  lightOnly?: boolean;
  avatar?: string;
  nameInitial?: string;
};

const ProfileHead: FC<Props> = props => {
  return (
    <div className="flex items-center space-x-2">
      {/* image / name initial */}
      <ProfileIcon {...props} />
    </div>
  );
};

export { ProfileHead };
