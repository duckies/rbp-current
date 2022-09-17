import { INestApplication, Logger } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { DatabaseModule } from '../src/common/database/database.module'
import { FormFieldModule } from '../src/form-field/form-field.module'

describe('FormField (e2e)', () => {
  const logger = new Logger('FormField (e2e)')
  let app: INestApplication

  beforeAll(async () => {
    beforeEach(async () => {
      const moduleFixture = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env.test',
            ignoreEnvVars: true,
          }),
          DatabaseModule,
          FormFieldModule,
        ],
      }).compile()

      app = moduleFixture.createNestApplication()
      const config = moduleFixture.get(ConfigService)
      console.log(config)
      console.log(config.get('DATABASE_URL'))
      app.useLogger(logger)
      await app.init()
    })
  })

  it('should load', async () => {
    const response = await request(app.getHttpServer()).get('/form-field')

    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  afterAll(async () => await app.close())
})
