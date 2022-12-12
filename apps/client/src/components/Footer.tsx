import { Container } from "components/Container"
import DiscordLogo from "components/icons/Discord"
import { Link } from "components/Link"
import type { FC, PropsWithChildren } from "react"

const FooterHeader: FC<PropsWithChildren> = ({ children }) => {
  return <p className="mb-4 text-lg font-medium">{children}</p>
}

export default function Footer() {
  return (
    <footer className="bg-surface-800">
      <Container className="grid grid-cols-4 border-t border-gray-800/80 bg-[url('/images/footer.jpg')] py-7 pt-10">
        <div>
          <FooterHeader>Really Bad Players</FooterHeader>
          <ul className="flex flex-col">
            <li>
              <Link to="https://discord.gg/rbp" style="plain" externalIcon={false}>
                <DiscordLogo className="inline-flex h-6 w-6" />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <FooterHeader>Presence</FooterHeader>
          <ul className="space-y-2">
            <li>
              <Link href="https://www.warcraftlogs.com/guild/us/area-52/really%20bad%20players">
                WarcraftLogs
              </Link>
            </li>
            <li>
              <Link href="https://raider.io/guilds/us/area-52/Really%20Bad%20Players">
                Raider.io
              </Link>
            </li>
            <li>
              <Link href="https://worldofwarcraft.com/en-us/guild/us/area-52/really-bad-players">
                World of Warcraft
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <FooterHeader>Resources</FooterHeader>
          <ul className="space-y-2">
            <li>
              <Link href="https://raidplan.io">RaidPlan.io</Link>
            </li>
            <li>
              <Link href="https://mythictrap.com">MythicTrap</Link>
            </li>
            <li>
              <Link href="https://raidbots.com">RaidBots</Link>
            </li>
            <li>
              <Link href="https://www.wowhead.com">Wowhead</Link>
            </li>
          </ul>
        </div>

        <div>
          <FooterHeader>About Us</FooterHeader>
          <ul className="space-y-2">
            <li>Privacy & Terms</li>
            <li>Terms of Service</li>
            <li></li>
          </ul>
        </div>

        <div className="col-span-4 my-5 text-center">Built with 💖 by Duckys - Area 52</div>
      </Container>
    </footer>
  )
}
