import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs'
import { NotFoundException } from '@nestjs/common'

export const MikroORMTestConfig = (
  entities: MikroOrmModuleSyncOptions['entities']
): MikroOrmModuleSyncOptions => ({
  type: 'mysql',
  clientUrl: 'mysql://root:root@localhost:3306/test',
  entities,
  schemaGenerator: {
    disableForeignKeys: false,
    createForeignKeyConstraints: false,
  },
  findOneOrFailHandler: (entityName) => {
    return new NotFoundException(`${entityName} not found`)
  },
})
