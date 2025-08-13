import { type FC } from 'react';
import { BiLoader } from 'react-icons/bi';

type Props = {
  onNext?: () => void;
  onPrev?: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  loading?: boolean;
};

const PaginationBtns: FC<Props> = props => {
  const { disableNext, disablePrev, onNext, onPrev, loading } = props;

  return (
    <div className="flex items-center space-x-3">
      {loading && (
        <BiLoader
          className="animate-spin text-accent-500 dark:text-accent-400"
          size={20}
        />
      )}
      <button
        onClick={onPrev}
        disabled={disablePrev}
        className="btn-secondary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={disableNext}
        className="btn-primary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export { PaginationBtns };
