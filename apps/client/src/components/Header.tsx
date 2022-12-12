import { Container } from "components/Container"
import DiscordLogo from "components/icons/Discord"
import Logo from "components/icons/Logo"
import { Link } from "components/Link"
import { NavigationMenu } from "components/navigation/NavigationMenu"
import { login } from "hooks/auth"
import { useAuth } from "hooks/stores/useAuth"
import { Avatar } from "./Avatar"
import { Button } from "./Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./Dropdown"

export default function Header() {
  const { user, logout } = useAuth()

  const onLogout = () => {
    logout()
  }

  return (
    <header className="sticky top-0 z-50 w-full py-2 before:absolute before:inset-0 before:bg-surface-800/90 before:backdrop-blur-md before:content-['']">
      <Container className="relative flex">
        <div className="flex items-center gap-2">
          <Link className="flex h-10 w-10" to="/" style="plain">
            <Logo />
          </Link>
        </div>

        <nav className="flex w-full justify-center">
          <NavigationMenu>
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Link to="/">Home</NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger>Posts</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  <NavigationMenu.ContentList style="featured">
                    <NavigationMenu.ContentListItem
                      style="featured"
                      to="/strategies"
                      title="Vault of the Incarnates"
                      img={{
                        src: "/images/vault.jpg",
                        alt: "Vault of the Incarnates Raid Entrance",
                        width: "437",
                        height: "664",
                      }}
                    >
                      Strategy guides and resources for Vault of the Incarnates.
                    </NavigationMenu.ContentListItem>

                    <NavigationMenu.ContentListItem to="#" title="Announcements">
                      Announcements and news from the guild.
                    </NavigationMenu.ContentListItem>

                    <NavigationMenu.ContentListItem to="#" title="Resources">
                      Blog-style posts with useful information for guildies.
                    </NavigationMenu.ContentListItem>
                  </NavigationMenu.ContentList>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger>Apply</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  <NavigationMenu.ContentList style="grid">
                    <NavigationMenu.ContentListItem to="/apply" title="Application">
                      Fill out an application to join the guild.
                    </NavigationMenu.ContentListItem>

                    <NavigationMenu.ContentListItem to="#" title="View Submissions">
                      View the list of submitted applications.
                    </NavigationMenu.ContentListItem>
                  </NavigationMenu.ContentList>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Indicator />
            </NavigationMenu.List>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-1.5">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="icon">
                    <Avatar user={user} priority />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent sideOffset={5} collisionPadding={5}>
                  <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
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
