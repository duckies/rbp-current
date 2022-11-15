import { login } from 'hooks/auth'
import DiscordLogo from 'components/icons/Discord'
import Logo from 'components/icons/Logo'
import Link from 'components/Link'
import NavLink from 'components/NavLink'
import { Container } from 'components/Container'
import { useAuth } from '../hooks/stores/useAuth'
import { Button } from './Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './Dropdown'
import { Avatar } from './Avatar'

export default function Header() {
  const { user, logout } = useAuth()
  const isAuthenticated = !!user

  return (
    <header className="sticky top-0 w-full py-2 bg-surface-800/90 backdrop-filter backdrop-blur-[10px] z-50">
      <Container className="relative flex">
        <div className="flex gap-2 items-center">
          <Link className="flex h-10 w-10" to="/">
            <Logo />
          </Link>
        </div>

        <nav className="flex justify-center w-full">
          <ul className="flex list-none gap-2 py-2">
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

        <div className="flex items-center gap-1.5">
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="icon">
                    <Avatar user={user} priority />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent sideOffset={5} collisionPadding={5}>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
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
      </Container>
    </header>
  )
}
