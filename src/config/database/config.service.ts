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
			host: dbConfig.host,
			port: dbConfig.port,
			username: dbConfig.username,
			password: dbConfig.password,
			database: dbConfig.database,
			synchronize: false,
			autoLoadEntities: true,
			entities: ['dist/**/**/*.entity{.ts,.js}'],
			logging: true
		};
	}
}
