import { defineConfig } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger, NotFoundException } from '@nestjs/common';

const logger = new Logger('MikrORM');

export default defineConfig({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  type: 'mysql',
  clientUrl: process.env.DATABASE_URL,
  highlighter: new SqlHighlighter(),
  driverOptions: {
    connection: {
      ssl: {
        rejectUnauthorized: true,
      },
    },
  },
  schemaGenerator: {
    disableForeignKeys: false,
    createForeignKeyConstraints: false,
  },
  findOneOrFailHandler: (entityName) => {
    return new NotFoundException(`${entityName} not found`);
  },
  debug: true,
  logger: logger.log.bind(logger),
});
