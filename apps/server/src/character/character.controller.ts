import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CharacterService } from './character.service';
import { FindCharacterDTO } from './dto/find-character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) { }

  @Post('/:region/:realm/:name')
  public create(@Param() findCharacterDTO: FindCharacterDTO) {
    return this.characterService.create(findCharacterDTO);
  }

  @Get('/lookup/:region/:realm/:name')
  public lookup(@Param() findCharacterDTO: FindCharacterDTO) {
    return this.characterService.lookup(findCharacterDTO);
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
    return this.characterService.patch(findCharacterDTO, ['character-profile-summary']);
  }

  @Delete('/:region/:realm/:name')
  public remove(@Param() findCharacterDTO: FindCharacterDTO) {
    return this.characterService.delete(findCharacterDTO);
  }
}
