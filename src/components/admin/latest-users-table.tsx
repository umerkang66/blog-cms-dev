import { IUser } from '@/types';
import { type FC } from 'react';
import { ProfileIcon } from '../common/ui/profile-icon';

type Props = { users: IUser[] };

const LatestUsersTable: FC<Props> = ({ users }) => {
  return (
    <div className="card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-1">
          Recent Users
        </h3>
        <p className="text-sm text-primary-600 dark:text-primary-400">
          Latest registered users
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-primary-200 dark:border-primary-700">
              <th className="p-3 text-xs md:text-sm font-medium text-primary-700 dark:text-primary-300">Profile</th>
              <th className="p-3 text-xs md:text-sm font-medium text-primary-700 dark:text-primary-300">Email</th>
              <th className="p-3 text-xs md:text-sm font-medium text-primary-700 dark:text-primary-300">Provider</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr
                className="border-b border-primary-100 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/50 transition-colors duration-200"
                key={user.id as string}
              >
                <td className="py-2.5 px-3">
                  <div className="flex items-center space-x-3">
                    <ProfileIcon
                      avatar={user.avatar}
                      nameInitial={user.name[0].toUpperCase()}
                    />
                    <span className="font-medium text-primary-900 dark:text-primary-100 text-sm md:text-base truncate max-w-[12rem] md:max-w-none">{user.name}</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-primary-700 dark:text-primary-300 text-xs md:text-sm truncate max-w-[14rem] md:max-w-none">{user.email}</td>
                <td className="py-2.5 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-200">
                    {user.provider}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {users.length === 0 && (
        <div className="text-center py-8 text-primary-500 dark:text-primary-400">
          No users found
        </div>
      )}
    </div>
  );
};

export { LatestUsersTable };
