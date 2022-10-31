import { Module } from '@nestjs/common';
import { FormFieldController } from './form-field.controller';
import { FormFieldService } from './form-field.service';

@Module({
  controllers: [FormFieldController],
  providers: [FormFieldService],
})
export class FormFieldModule {}
