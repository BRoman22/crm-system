import { useLogoutMutation } from '../../store/api/user';

export default function ProfilePage() {
  const [logout] = useLogoutMutation();

  return <h1 onClick={() => logout()}>привет</h1>;
}
