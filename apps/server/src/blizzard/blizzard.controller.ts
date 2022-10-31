import { Controller, Get, Param } from '@nestjs/common';
import { BlizzardService } from './blizzard.service';
import { CharacterDTO } from './dto/character.dto';

@Controller('/blizzard/')
export class BlizzardController {
  constructor(private readonly blizzardService: BlizzardService) { }

  @Get('/character/:region/:realm/:name')
  getCharacter(@Param() characterDTO: CharacterDTO) {
    return this.blizzardService.getCharacter(characterDTO);
  }
}
