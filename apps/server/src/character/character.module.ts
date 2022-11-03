import { Module } from '@nestjs/common';
import { BlizzardModule } from '../blizzard/blizzard.module';
import { CharacterController } from './character.controller';
import { CharacterOrchestrator } from './character.orchestrator';
import { CharacterService } from './character.service';

@Module({
  imports: [BlizzardModule],
  controllers: [CharacterController],
  providers: [CharacterService, CharacterOrchestrator],
})
export class CharacterModule { }
