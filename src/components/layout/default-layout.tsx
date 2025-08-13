import { type FC, PropsWithChildren } from 'react';
import { AppHead } from '../common/app-head';
import { UserNav } from '../common/ui/nav/user-nav';

type Props = { title?: string; desc?: string } & PropsWithChildren;

const DefaultLayout: FC<Props> = ({ children, title, desc }) => {
  return (
    <>
      <AppHead title={title} desc={desc} />
      <div className="min-h-screen bg-primary-50 dark:bg-primary-950 transition-colors duration-200">
        <UserNav />
        <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </>
  );
};

export { DefaultLayout };
