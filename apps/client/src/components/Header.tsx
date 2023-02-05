"use client"

import { Avatar } from "components/Avatar"
import Button from "components/Button"
import { Container } from "components/Container"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/Dropdown"
import Logo from "components/icons/Logo"
import { Link } from "components/Link"
import { NavigationMenu } from "components/navigation/NavigationMenu"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { cn } from "utils/cn"

type HeaderProps = {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const { data } = useSession()
  const router = useRouter()

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full py-2 before:absolute before:inset-0 before:bg-surface-800/80 before:backdrop-blur-sm before:content-['']",
        className
      )}
    >
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

                    <NavigationMenu.ContentListItem to="/announcements" title="Announcements">
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

        <div className="relative flex items-center gap-1.5">
          {data && data.user?.avatar ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="icon">
                    <Avatar src={data.user.avatar} size={80} alt={data.user.discord.identifier} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent sideOffset={5} collisionPadding={5}>
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button variant="outline" onClick={() => signIn("discord")}>
              Login
            </Button>
          )}
        </div>
      </Container>
    </header>
  )
}
