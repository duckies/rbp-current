import type { User } from '@rbp/server';
import type { ImageProps } from 'next/image';
import Image from 'next/image';

export interface AvatarProps extends Omit<ImageProps, 'src' | 'alt'> {
  user: User
  size?: number
}

export function getAvatar(user: User) {
  const discord = user.identities.find(i => i.provider === 'discord')!;

  if (discord.avatar) {
    return `https://cdn.discordapp.com/avatars/${discord.id}/${discord.avatar}.png`;
  }

  const discriminator = +discord.identifier.split('#')[1];
  return `https://cdn.discordapp.com/embed/avatars/${discriminator % 5}.png`;
}

export function Avatar({ user, size = 40, ...props }: AvatarProps) {
  const avatar = getAvatar(user);

  return (
    <Image
      src={avatar}
      className="object-cover"
      alt="Discord Avatar"
      height={size}
      width={size}
      {...props}
    />
  );
}
