import type { UserDTO } from '@rbp/server';
import Image from 'next/image';
import css from 'styles/components/avatar.module.scss';

export interface AvatarProps {
  user: UserDTO;
}

export function getAvatar(user: UserDTO) {
  if (user.discord.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.discord.id}/${user.discord.avatar}.png`;
  }

  const discriminator = +user.discord.identifier.split('#')[1];
  return `https://cdn.discordapp.com/embed/avatars/${discriminator % 5}.png`;
}

export function Avatar({ user }: AvatarProps) {
  const avatar = getAvatar(user);

  return (
    <div className={css.avatar}>
      <Image
        className="avatar__image"
        src={avatar}
        alt="Discord Avatar"
        width={35}
        height={35}
      />
    </div>
  );
}
