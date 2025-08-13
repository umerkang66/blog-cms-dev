import { type NextPage } from 'next';
import { AdminLayout } from '@/components/layout/admin-layout';
import { LatestUsersTable } from '@/components/admin/latest-users-table';
import { usePaginatedUsers } from '@/hooks/user-hooks';
import { PaginationBtns } from '@/components/common/ui/button/pagination-btns';
import { useState } from 'react';

type Props = {};
const limit = 5;

const Users: NextPage<Props> = () => {
  const [page, setPage] = useState(1);
  const { users, loading } = usePaginatedUsers(page, limit);

  const onPrev = () => setPage(prev => (prev === 1 ? prev : prev - 1));
  const onNext = () =>
    setPage(prev => (users.length < limit ? prev : prev + 1));

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-2">
          All Users
        </h1>
        <p className="text-primary-600 dark:text-primary-400">
          Manage user accounts and permissions
        </p>
      </div>
      
      <LatestUsersTable users={users} />

      <div className="mt-6 flex w-full justify-end">
        <PaginationBtns
          disablePrev={page === 1}
          disableNext={users.length < limit}
          onPrev={onPrev}
          onNext={onNext}
          loading={loading}
        />
      </div>
    </AdminLayout>
  );
};

export default Users;
