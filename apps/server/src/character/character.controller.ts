import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProfileEndpoint } from '@rbp/battle.net';
import { CharacterService } from './character.service';
import { FindCharacterDTO } from './dto/character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) { }

  @Post('/:region/:realm/:name')
  public create(@Param() findCharacterDTO: FindCharacterDTO) {
    return this.characterService.create(findCharacterDTO);
  }

  @Get('/:region/:realm/:name')
  public findOne(@Param() findCharacterDTO: FindCharacterDTO) {
    return this.characterService.repository.findOneOrFail(findCharacterDTO);
  }

  @Get()
  public findAll() {
    return this.characterService.repository.findAll();
  }

  @Patch('/:region/:realm/:name')
  public update(@Param() findCharacterDTO: FindCharacterDTO) {
    return this.characterService.patch(findCharacterDTO, [ProfileEndpoint.CharacterProfileSummary]);
  }

  @Delete('/:region/:realm/:name')
  public remove(@Param() findCharacterDTO: FindCharacterDTO) {
    return this.characterService.delete(findCharacterDTO);
  }
}
