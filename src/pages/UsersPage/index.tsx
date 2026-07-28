import { Navigate } from 'react-router-dom';
import { useHasAccess } from '../../hooks/useHasAccess';

interface Props {
  redirectPath: string;
}

export default function UsersPage({ redirectPath }: Props) {
  const hasAccess = useHasAccess(['ADMIN', 'MODERATOR']);
  if (!hasAccess) {
    return <Navigate to={redirectPath} replace />;
  }

  return <div>UsersPage</div>;
}
