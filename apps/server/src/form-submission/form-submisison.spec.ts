import { MikroORM } from '@mikro-orm/core';
import { SqlEntityManager } from '@mikro-orm/knex';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { beforeAll, describe } from 'vitest';
import { FormSubmissionModule } from './form-submission.module';
import { FormSubmissionService } from './form-submission.service';

describe('FormSubmission', () => {
  let app: INestApplication;
  // let service: FormSubmissionService;
  // let orm: MikroORM;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [FormSubmissionModule],
    })
      .overrideProvider(SqlEntityManager)
      .useValue({
        em: {
          findOneOrFail: () => Promise.resolve({ id: 1 }),
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    // service = moduleFixture.get(FormSubmissionService);
    // orm = moduleFixture.get(MikroORM);

    await app.init();
  });
});
