import { useAuth } from "../hooks/stores/useAuth";
import { Avatar } from "./Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./Dropdown";
import { Button } from "./Button";
import css from "styles/components/header.module.scss";
import { login } from "hooks/auth";
import DiscordLogo from "components/icons/Discord";
import Logo from "components/icons/Logo";
import Link from "components/Link";
import NavLink from "components/NavLink";

export default function Header() {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;

  return (
    <header className={css.header}>
      <div className={css.header__container}>
        <div className={css.header__start}>
          <Link className={css.header__logo} to="/">
            <Logo size={37} />
          </Link>
        </div>

        <nav className={css.header__center}>
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

        <div className={css.header__end}>
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="icon">
                    <Avatar user={user} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent sideOffset={5} collisionPadding={5}>
                  <DropdownMenuItem onClick={() => logout()}>
                    Logout
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Discord <DiscordLogo />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button variant="outline" onClick={login}>
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
