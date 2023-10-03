import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { AppConfig, appConfig } from './app.config';

@Injectable()
export class AppService {
	constructor(@Inject(appConfig.KEY) private readonly config: ConfigType<AppConfig>) {}

	getHello(): string {
		const host = this.config.host;
		const port = this.config.port;

		console.log('###', {
			host,
			port
		});

		return 'slack clone api server';
	}
}
