import { Container } from "components/Container"
import DiscordLogo from "components/icons/Discord"
import Logo from "components/icons/Logo"
import { Link } from "components/Link"
import { ContentList, ContentListItem } from "components/navigation/content"
import { NavigationMenu } from "components/navigation/menu"
import { login } from "hooks/auth"
import { useAuth } from "../hooks/stores/useAuth"
import { Avatar } from "./Avatar"
import { Button } from "./Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./Dropdown"

export default function Header() {
  const { user } = useAuth()
  const isAuthenticated = !!user

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-800/90 py-2 backdrop-blur-[10px] backdrop-filter">
      <Container className="relative flex">
        <div className="flex items-center gap-2">
          <Link className="flex h-10 w-10" to="/">
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
                  <ContentList style="featured">
                    <ContentListItem
                      style="featured"
                      to="/posts/vault-of-the-incarnates"
                      title="Vault of the Incarnates"
                      img={{
                        src: "/images/vault.jpg",
                        alt: "Vault of the Incarnates Raid Entrance",
                        width: "437",
                        height: "664",
                      }}
                    >
                      Strategy guides and resources for the first Dragonflight raid.
                    </ContentListItem>

                    <ContentListItem to="/posts" title="Posts">
                      All recent posts
                    </ContentListItem>

                    <ContentListItem to="/posts" title="Announcements">
                      Guild announcements
                    </ContentListItem>
                  </ContentList>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger>Apply</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  <ContentList style="grid">
                    <ContentListItem to="/apply" title="Application">
                      Fill out an application to join the guild.
                    </ContentListItem>

                    <ContentListItem to="/applications" title="View Submissions">
                      View the list of submitted applications.
                    </ContentListItem>
                  </ContentList>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Indicator />
            </NavigationMenu.List>
          </NavigationMenu>
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
