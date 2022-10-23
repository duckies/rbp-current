import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/stores/useAuth';
import { Avatar } from './Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './Dropdown';
import { Button } from './Button';
import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';
import { login } from 'hooks/auth';
import DiscordLogo from 'components/icons/Discord';
import Logo from 'components/icons/Logo';
import Link from 'components/Link';
import NavLink from 'components/NavLink';
import Container from 'components/Container';

export default function Header() {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const isAuthenticated = !!user;

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <header className="sticky top-0 w-full border-b-gray-900 bg-gray-900 bg-opacity-80 backdrop-blur-sm backdrop-saturate-[180%]">
      <Container className="relative flex items-center justify-between">
        <div className="flex flex-grow-0 gap-2 items-center ">
          <Link to="/">
            <Logo size={37} />
          </Link>
        </div>

        <nav>
          <ul className="flex list-none gap-2">
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

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="icon">
                    <Avatar user={user} priority />
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

          <Button variant="icon" size="small" onClick={toggleTheme}>
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </div>
      </Container>
    </header>
  );
}
