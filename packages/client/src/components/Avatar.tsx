import type { UserDTO } from '@rbp/server';
import type { ImageProps } from 'next/future/image';
import Image from 'next/future/image';

export interface AvatarProps extends Omit<ImageProps, 'src' | 'alt'> {
  user: UserDTO
  size?: number
}

export function getAvatar(user: UserDTO) {
  if (user.discord.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.discord.id}/${user.discord.avatar}.png`;
  }

  const discriminator = +user.discord.identifier.split('#')[1];
  return `https://cdn.discordapp.com/embed/avatars/${discriminator % 5}.png`;
}

export function Avatar({ user, size = 40 }: AvatarProps) {
  const avatar = getAvatar(user);

  return (
    <Image
      src={avatar}
      className="object-cover"
      alt="Discord Avatar"
      height={size}
      width={size}
    />
  );
}
