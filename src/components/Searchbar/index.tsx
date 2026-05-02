import styles from './styles.module.scss';
import { Button } from '../../ui-kit';

export default function Searchbar() {
  return (
    <div className={styles.searchbar}>
      <input
        className={styles.searchbar__input}
        autoComplete="off"
        name="name"
        placeholder="Task To Be Done..."
      />
      <Button title="Add" extraClassName={styles.button__add} />
    </div>
  );
}
