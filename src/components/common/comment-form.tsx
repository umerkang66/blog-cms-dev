import { useEffect, type FC } from 'react';
import { EditorContent } from '@tiptap/react';
import { useEditorConfig } from '@/hooks/use-editor-config';
import { ActionButton } from './ui/button';
import { getFocusedEditor } from '../editor/editor-utils';

type Props = {
  placeholder?: string;
  title?: string;
  busy?: boolean;
  btnTitle?: string;
  initialState?: string;
  onSubmit?: (content: string) => void;
  onClose?: () => void;
};

const CommentForm: FC<Props> = ({
  placeholder,
  title,
  busy = false,
  btnTitle,
  initialState,
  onSubmit,
  onClose,
}) => {
  const { editor } = useEditorConfig({
    placeholder: placeholder ?? 'Add your comment...',
  });

  const handleSubmit = () => {
    if (!editor || busy) return;

    const value = editor.getHTML();
    if (value === '<p></p>') return;
    onSubmit && onSubmit(value);
  };

  useEffect(() => {
    if (editor) {
      getFocusedEditor(editor).setContent(initialState!).run();
    }
  }, [editor, initialState]);

  return (
    <div className="space-y-4">
      {!!title && (
        <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
          {title}
        </h3>
      )}
      <EditorContent
        onClick={() => getFocusedEditor(editor!).run()}
        className="min-h-[100px] cursor-text rounded-lg border border-primary-200 dark:border-primary-700 p-3 bg-white dark:bg-primary-900 focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500/20 transition-all duration-200"
        editor={editor}
      />

      <div className="flex items-center justify-end space-x-3">
        <ActionButton
          title={btnTitle ?? 'Submit'}
          onClick={handleSubmit}
          busy={busy}
          variant="primary"
          size="sm"
        />

        {!!onClose && (
          <button
            onClick={onClose}
            className="btn-ghost btn-sm"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export { CommentForm };
