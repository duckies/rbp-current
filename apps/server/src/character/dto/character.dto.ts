import { RealmSlug, RealmSlugs, Region, Regions } from '@rbp/battle.net';
import { Transform } from 'class-transformer';
import { IsAlpha, IsIn, IsString, MaxLength, MinLength } from 'class-validator';

export class FindCharacterDTO {
  @Transform(({ value }) => value.toLowerCase())
  @IsAlpha()
  @MinLength(2)
  @MaxLength(12)
  @IsString()
  name!: string;

  @IsIn(RealmSlugs)
  realm!: RealmSlug;

  @IsIn(Regions)
  region!: Region;
}
