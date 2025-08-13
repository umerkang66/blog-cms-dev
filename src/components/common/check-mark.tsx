import { type FC } from 'react';
import { BsCheckLg } from 'react-icons/bs';

type Props = { visible: boolean };

const CheckMark: FC<Props> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="rounded-full bg-success-500/80 p-2 text-white backdrop-blur-sm shadow-glow animate-scale-in">
      <BsCheckLg className="h-4 w-4" />
    </div>
  );
};

export { CheckMark };
