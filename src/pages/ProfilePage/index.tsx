interface Props {
  onLogout: () => void;
}

export default function ProfilePage({ onLogout }: Props) {
  return <h1 onClick={onLogout}>привет</h1>;
}
