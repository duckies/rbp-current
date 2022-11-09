import { Controller, Get, Param } from '@nestjs/common';
import { FindCharacterDTO } from '../character/dto/find-character.dto';
import { BlizzardService } from './blizzard.service';

@Controller('/blizzard/')
export class BlizzardController {
  constructor(private readonly blizzardService: BlizzardService) { }

  @Get('/character/:region/:realm/:name')
  getCharacter(@Param() findCharacterDTO: FindCharacterDTO) {
    return this.blizzardService.getCharacter(findCharacterDTO);
  }
}
