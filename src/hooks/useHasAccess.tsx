import type { Role } from '../types';
import { useAppSelector } from '../store';

export const useHasAccess = (requiredRoles: Role[]) => {
  const { user } = useAppSelector((state) => state.user);
  const hasAccess = user?.roles.some((role) => requiredRoles.includes(role)) ?? false;

  return hasAccess;
};

export default useHasAccess;
