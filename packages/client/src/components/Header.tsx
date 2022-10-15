import { useAuth } from '../hooks/stores/useAuth';
import { Avatar } from './Avatar';
import { login } from 'hooks/auth';
import DiscordLogo from 'components/icons/Discord';
import Logo from 'components/icons/Logo';
import Link from 'components/Link';
import NavLink from 'components/NavLink';
import styles from 'styles/components/Header.module.scss';

export default function Header() {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__start}>
          <Link className={styles.header__logo} to="/">
            <Logo size={37} />
          </Link>
        </div>

        <nav className={styles.header__center}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/apply">Apply</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.header__end}>
          {isAuthenticated ? (
            <>
              <Avatar user={user} />
              <button onClick={() => logout(undefined)}>Logout</button>
            </>
          ) : (
            <button onClick={() => login()}>Login</button>
          )}

          <Link className={styles.action} to="https://discord.gg/rbp">
            <DiscordLogo />
          </Link>
        </div>
      </div>
    </header>
  );
}
