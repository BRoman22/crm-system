import { Navigate } from 'react-router-dom';
import { useHasAccess } from '../../hooks/useHasAccess';
import { useState } from 'react';
import { useGetUsersQuery } from '../../store/api/admin';
import type { UserFilters } from '../../types';

interface Props {
  redirectPath: string;
}

export default function UsersPage({ redirectPath }: Props) {
  const hasAccess = useHasAccess(['ADMIN', 'MODERATOR']);
  const [query, setQuery] = useState({
    search: '',
    sortBy: '',
    sortOrder: 'asc',
    isBlocked: false,
    limit: 10,
    page: 1,
  } as UserFilters);
  const { data: users, isLoading } = useGetUsersQuery(query);
  console.log(users, isLoading, setQuery);

  if (!hasAccess) {
    return <Navigate to={redirectPath} replace />;
  }

  return <div>UsersPage</div>;
}
