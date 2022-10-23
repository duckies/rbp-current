import fs from 'fs';
import { resolve } from 'path';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { isArray, isBoolean, isObject } from '@rbp/shared';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import dotenv from 'dotenv';
import { set } from 'lodash';
import type { Constructor, Dictionary } from '../common/interfaces';
import type { ConfigModuleOptions } from './interfaces';

@Module({})
export class ConfigModule {
  public static forRoot(options: ConfigModuleOptions): DynamicModule {
    let config = options.ignoreEnvFile ? {} : this.loadEnvFile(options);

    if (!options.ignoreEnvVars) {
      config = { ...config, ...process.env };
    }

    if (options.envSeparator) {
      const tempConfig = {};
      Object.entries(config).forEach(([key, value]) => {
        set(tempConfig, key.split(options.envSeparator!), value);
      });
      config = tempConfig;
    }

    const validatedConfig = this.validate(options.schema, config);
    const providers = this.getProviders(options.schema, validatedConfig);

    this.assignVariablesToProcess(validatedConfig);

    return {
      module: ConfigModule,
      global: isBoolean(options.isGlobal) ? options.isGlobal : true,
      providers,
      exports: providers,
    };
  }

  private static loadEnvFile(options: ConfigModuleOptions): Dictionary {
    const envFileName = options.envFileName || '.env';
    const envFilePath = resolve(__dirname, '../../', envFileName);

    if (fs.existsSync(envFilePath)) {
      return dotenv.parse(fs.readFileSync(envFilePath));
    }

    return {};
  }

  private static validate<T extends Dictionary>(
    schema: Constructor<T>,
    config: T,
  ) {
    const validatedConfig = plainToInstance(schema, config, {
      enableImplicitConversion: true,
      exposeDefaultValues: true,
    });

    const errors = validateSync(validatedConfig, {
      forbidUnknownValues: true,
      whitelist: true,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return validatedConfig;
  }

  private static getProviders<T extends Dictionary>(
    schema: Constructor<T>,
    config: T,
  ) {
    const providers: Provider[] = [
      {
        provide: schema,
        useValue: config,
      },
      ...this.getNestedProviders(config),
    ];

    return providers;
  }

  private static getNestedProviders(object: Dictionary) {
    const providers: Provider[] = [];

    const helper = (object: Dictionary) => {
      Object.entries(object).forEach(([, value]) => {
        if (isObject(value) && !isArray(value)) {
          if (value.constructor !== Object) {
            providers.push({
              provide: value.constructor,
              useValue: value,
            });
          }
          helper(value);
        }
      });
    };

    helper(object);
    return providers;
  }

  private static assignVariablesToProcess(config: Dictionary) {
    const keys = Object.keys(config).filter(key => !(key in process.env));

    keys.forEach(key => (process.env[key] = config[key]));
  }
}
