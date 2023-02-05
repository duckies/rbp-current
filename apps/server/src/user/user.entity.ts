import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  OptionalProps,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'
import { Identity } from '../auth/identity/identity.entity'
import { Role } from '../role/role.entity'

@Entity()
export class User {
  [OptionalProps]?: 'discord' | 'discriminator' | 'avatar'

  @PrimaryKey()
  id!: number

  @OneToMany(() => Identity, (i) => i.user)
  identities = new Collection<Identity>(this)

  @ManyToMany(() => Role)
  roles = new Collection<Role>(this)

  @Property({ persist: false })
  get discord() {
    return this.identities.getItems().find((i) => i.provider === 'discord')!
  }

  @Property({ persist: false })
  get discriminator() {
    return this.discord.identifier.split('#')[1]
  }

  @Property({ persist: false })
  get avatar() {
    if (this.discord.avatar) {
      return `https://cdn.discordapp.com/avatars/${this.discord.id}/${this.discord.avatar}.${
        this.discord.avatar.startsWith('a_') ? 'gif' : 'png'
      }`
    }

    return `https://cdn.discordapp.com/embed/avatars/${Number(this.discriminator) % 5}.png`
  }
}
