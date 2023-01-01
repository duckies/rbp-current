import { MikroORM } from '@mikro-orm/core'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { WoWClient } from '@rbp/battle.net'
import nock from 'nock'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { logger } from '../src/app.logger'
import {
  JsonWebTokenExceptionFilter,
  NotBeforeExceptionFilter,
  TokenExpiredExceptionFilter,
} from '../src/auth/exception-filters'
import { Character } from '../src/character/character.entity'
import { FormField } from '../src/form-field/form-field.entity'
import { FormSubmissionCharacter } from '../src/form-submission/form-submission-character.entity'
import { FormSubmission } from '../src/form-submission/form-submission.entity'
import { FormSubmissionModule } from '../src/form-submission/form-submission.module'
import { Form } from '../src/form/form.entity'
import { WinstonModule } from '../src/logger/logger.module'
import { WinstonLogger } from '../src/logger/logger.service'
import { EndpointFixtureMap } from './fixtures/profile-apis.fixture'
import { MikroORMTestConfig } from './orm'
import { TestingSeeder } from './seeder'

describe('FormSubmission (e2e)', () => {
  const winston = new WinstonLogger(logger)
  let app: INestApplication
  let orm: MikroORM

  beforeAll(async () => {
    beforeEach(async () => {
      const moduleFixture = await Test.createTestingModule({
        imports: [
          WinstonModule.forRoot(logger),
          MikroOrmModule.forRoot(
            MikroORMTestConfig([
              Form,
              FormField,
              FormSubmission,
              FormSubmissionCharacter,
              Character,
            ])
          ),
          FormSubmissionModule,
        ],
      })
        .overrideProvider(WoWClient)
        .useValue(
          new WoWClient({
            clientId: 'TEST_BLIZZARD_ID',
            clientSecret: 'TEST_BLIZZARD_SECRET',
            defaults: {
              region: 'us',
              locale: 'en_US',
            },
          })
        )
        .compile()

      app = moduleFixture.createNestApplication()
      orm = app.get(MikroORM)

      await orm.getSchemaGenerator().refreshDatabase()
      await orm.getSeeder().seed(TestingSeeder)

      // Disable during normal tests.
      app.useLogger(winston)

      app.useGlobalFilters(
        new NotBeforeExceptionFilter(),
        new JsonWebTokenExceptionFilter(),
        new TokenExpiredExceptionFilter()
      )

      app.useGlobalPipes(
        new ValidationPipe({
          forbidNonWhitelisted: true,
          whitelist: true,
          transform: true,
        })
      )

      await app.init()
    })
  })

  it('should find the seeded form', async () => {
    const form = await orm.em.fork().findOneOrFail(Form, 1)

    expect(form.title).toBe('Raider Application')
  })

  it('should successfully submit an application', async () => {
    const form = await orm.em.fork().findOneOrFail(Form, 1)

    const createFormSubmissionDTO = {
      responses: form.fields.toArray().reduce((responses, field) => {
        switch (field.type) {
          case 'character':
            responses[field.id] = [{ region: 'us', realm: 'area-52', name: 'Duckys', main: true }]
            break
          case 'text':
            responses[field.id] = 'Lorem ipsum'
            break
          default:
            throw new Error(`Unhandled field type: ${field.type}`)
        }

        return responses
      }, {} as Record<string, any>),
    }

    const fixtures = EndpointFixtureMap({
      id: '123456789',
      region: 'us',
      realm: 'area-52',
      name: 'Duckys',
    })

    nock('https://us.battle.net').post('/oauth/token').reply(200, {
      access_token: 'test_access_token',
      token_type: 'bearer',
      expires_in: '86399',
    })

    Object.values(fixtures).forEach(({ url, response }) =>
      nock('https://us.api.blizzard.com/profile/wow').get(url).reply(200, response)
    )

    const response = await request(app.getHttpServer())
      .post(`/form-submission/${form.id}`)
      .send(createFormSubmissionDTO)
      .expect(201)

    expect(response.body.form.title).toBe('Raider Application')
    expect(response.body.characters).toHaveLength(1)
  })

  afterAll(async () => {
    await orm.close()
  })
})
