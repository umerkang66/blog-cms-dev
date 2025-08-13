import { type FC } from 'react';
import { ImSpinner3 } from 'react-icons/im';
import { BsExclamationTriangle, BsInfoCircle } from 'react-icons/bs';

import { ModalContainer, ModalContainerProps } from './modal-container';

interface Props extends ModalContainerProps {
  title: string;
  subTitle: string;
  danger?: boolean;
  busy?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const ConfirmModal: FC<Props> = ({
  title,
  subTitle,
  onCancel,
  onConfirm,
  onClose,
  visible,
  danger = false,
  busy = false,
}) => {
  const Icon = danger ? BsExclamationTriangle : BsInfoCircle;
  const iconColor = danger ? 'text-danger-500' : 'text-accent-500';

  return (
    <ModalContainer onClose={onClose} visible={visible}>
      <div className="w-full max-w-md mx-auto animate-scale-in">
        <div className="card overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-primary-200 dark:border-primary-700">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full bg-primary-100 dark:bg-primary-800 ${iconColor}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                {title}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <p className="text-primary-600 dark:text-primary-300 leading-relaxed">
              {subTitle}
            </p>

            {busy && (
              <div className="mt-4 flex items-center space-x-3 p-3 bg-primary-50 dark:bg-primary-800/50 rounded-lg">
                <ImSpinner3 className="animate-spin text-accent-500" />
                <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                  Please wait...
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          {!busy && (
            <div className="px-6 py-4 bg-primary-50 dark:bg-primary-800/20 flex items-center justify-end space-x-3">
              <button
                className="btn-secondary btn-sm"
                onClick={onCancel}
                type="button"
                disabled={busy}
              >
                Cancel
              </button>
              <button
                className={`btn-sm ${danger ? 'btn-danger' : 'btn-primary'}`}
                onClick={onConfirm}
                type="button"
                disabled={busy}
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </ModalContainer>
  );
};

export { ConfirmModal };
