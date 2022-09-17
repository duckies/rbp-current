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
import { CreateFormFieldBaseDTO } from './dto/create-form-field.dto'
import { UpdateFormFieldDTO } from './dto/update-form-field.dto'
import { FormFieldService } from './form-field.service'

@Controller('form-field')
export class FormFieldController {
  constructor(private readonly formFieldService: FormFieldService) {}

  @Post('form/:formId')
  create(
    @Param('formId') formId: number,
    @Body() createFormFieldDTO: CreateFormFieldBaseDTO
  ) {
    return this.formFieldService.create(formId, createFormFieldDTO)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.formFieldService.findOne(id)
  }

  @Get()
  findAll(@Query('take') take?: number, @Query('skip') skip?: number) {
    return this.formFieldService.findAll(take, skip)
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateFormFieldDTO: UpdateFormFieldDTO
  ) {
    return this.formFieldService.update(id, updateFormFieldDTO)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.formFieldService.delete(id)
  }
}
