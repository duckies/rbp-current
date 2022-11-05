import { login } from 'hooks/auth';
import DiscordLogo from 'components/icons/Discord';
import Logo from 'components/icons/Logo';
import Link from 'components/Link';
import NavLink from 'components/NavLink';
import Container from 'components/Container';
import { useAuth } from '../hooks/stores/useAuth';
import { Button } from './Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './Dropdown';
import { Avatar } from './Avatar';

export default function Header() {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;

  return (
    <header className="sticky top:0 w:full py:8 bg:rgba(33,32,34,0.93) bd:blur(10)|saturate(180%) z:100">
      <Container className="rel flex ai:center jc:center">

        <div className="flex gap:8 ai:center">
          <Link className="flex h:40 w:40" to="/">
            <Logo />
          </Link>
        </div>

        <nav className="flex jc:center w:full">
          <ul className="flex list-none gap:8 py:8">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/apply">Apply</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </nav>

        <div className="flex ai:center gap:6">
          {isAuthenticated
            ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="icon">
                      <Avatar user={user} priority />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent sideOffset={5} collisionPadding={5}>
                    <DropdownMenuItem>
                      Logout
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Discord <DiscordLogo />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>)
            : (
              <Button variant="outline" onClick={login}>
                Login
              </Button>
              )
            }
        </div>
      </Container>
    </header>
  );
}
