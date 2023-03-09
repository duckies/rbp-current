import { Options } from '@mikro-orm/mysql'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import MikroOrmConfig from '../src/mikro-orm.config'

export function MikroORMTestModule(dbName: string, entities: Options['entities']) {
  return MikroOrmModule.forRoot({
    ...MikroOrmConfig,
    entitiesTs: undefined,
    driverOptions: undefined,
    entities,
    clientUrl: `mysql://root@localhost:3306/${dbName}`,
  })
}
