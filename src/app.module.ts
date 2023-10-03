import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from './app.config';

@Module({
	imports: [ConfigModule.forRoot({ cache: true, isGlobal: true, load: [appConfig] })],
	controllers: [AppController],
	providers: [AppService, ConfigService]
})
export class AppModule {}
