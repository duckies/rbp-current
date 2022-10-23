import { Module } from '@nestjs/common';
import { FormSubmissionService } from './form-submission.service';

@Module({
  providers: [FormSubmissionService],
})
export class FormSubmissionModule {}
