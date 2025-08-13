import { FC, useEffect, useState } from 'react';
import { validateLink } from '../editor-utils';

export type LinkOption = { url: string; openInNewTab: boolean };

type Props = {
  visible: boolean;
  onSubmit: (link: LinkOption) => void;
  initialState?: LinkOption;
};

const defaultLink = { url: '', openInNewTab: false };

const LinkForm: FC<Props> = ({ visible, initialState, onSubmit }) => {
  const [link, setLink] = useState<LinkOption>(defaultLink);

  const resetForm = () => setLink({ ...defaultLink });

  const handleSubmit = () => {
    if (!link.url.trim()) return;
    link.url = validateLink(link.url);

    onSubmit(link);
    resetForm();
  };

  useEffect(() => {
    if (initialState) setLink({ ...initialState });
  }, [initialState]);

  if (!visible) return null;

  return (
    <div className="rounded bg-white p-2 shadow-sm shadow-primary-200 dark:bg-primary-900">
      <input
        autoFocus
        type="text"
        value={link.url}
        onChange={({ target: { value: url } }) =>
          setLink(prev => ({ ...prev, url }))
        }
        placeholder="https://example.com"
        className="rounded border-2 border-primary-300 bg-transparent p-2 text-primary-900 transition focus:border-primary-400 dark:border-primary-700 dark:text-primary-100 dark:focus:border-primary-500"
      />
      <div className="mt-2 flex items-center space-x-2">
        <input
          type="checkbox"
          id="open-in-new-tab"
          checked={link.openInNewTab}
          onChange={({ target: { checked: openInNewTab } }) =>
            setLink(prev => ({ ...prev, openInNewTab }))
          }
        />
        <label
          className="text-primary-700 dark:text-primary-300"
          htmlFor="open-in-new-tab"
        >
          Open in new Tab
        </label>

        <div className="flex-1 text-right">
          <button
            onClick={handleSubmit}
            className="rounded bg-accent-600 hover:bg-accent-700 px-2 py-1 text-sm text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export { LinkForm };
