import { IsIn, IsString } from 'class-validator';
import {
  RealmSlug,
  RealmSlugs,
  RegionSlug,
  RegionSlugs,
} from '../blizzard.constants';

export class CharacterDTO {
  @IsString()
  name!: string;

  @IsIn(RealmSlugs)
  realm!: RealmSlug;

  @IsIn(RegionSlugs)
  region!: RegionSlug;
}
