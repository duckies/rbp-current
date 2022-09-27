import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { FormService } from './form.service'
import { CreateFormDTO, UpdateFormDTO } from './dto'

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  create(@Body() createFormDTO: CreateFormDTO) {
    return this.formService.create(createFormDTO)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.formService.findOne(id)
  }

  @Get()
  findAll(@Query('take') take?: number, @Query('skip') skip?: number) {
    return this.formService.findAll({ take, skip })
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFormDTO: UpdateFormDTO) {
    return this.formService.update(id, updateFormDTO)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.formService.delete(id)
  }
}
