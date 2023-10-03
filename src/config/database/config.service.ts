import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { AppConfig, appConfig } from '../app.config';

@Injectable()
export class MariaDBConfigService implements TypeOrmOptionsFactory {
	constructor(@Inject(appConfig.KEY) private readonly config: ConfigType<AppConfig>) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		const dbConfig = this.config.db;

		return {
			type: 'mariadb',
			username: dbConfig.username,
			password: dbConfig.password,
			port: dbConfig.port,
			host: dbConfig.host,
			database: dbConfig.database,
			// autoLoadEntities: true,
			entities: ['dist/**/**/*.entity{.ts,.js}'],
			synchronize: false,
			logging: true
		};
	}
}
