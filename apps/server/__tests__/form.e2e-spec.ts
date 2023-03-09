import { MikroORM } from '@mikro-orm/core'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import { Form } from '../src/form/form.entity'
import { MikroORMTestModule } from './orm'

describe.only('Form (e2e)', () => {
  let app: INestApplication
  let orm: MikroORM

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [MikroORMTestModule('form-tests', [Form])],
    }).compile()

    app = moduleFixture.createNestApplication()
    orm = app.get(MikroORM)

    await app.init()
  })

  beforeEach(async () => {
    await orm.getSchemaGenerator().refreshDatabase()
  })

  afterAll(async () => await app.close())

  it('does database shit', async () => {})
})
