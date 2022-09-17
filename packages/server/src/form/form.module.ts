import { Module } from '@nestjs/common'
import { FormService } from '../form-field/form.service'
import { FormController } from './form.controller'

@Module({
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
