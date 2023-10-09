import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChannelsModule } from './channels/channels.module';
import { LoggingMiddleware } from './common';
import { MariaDBConfigModule, MariaDBConfigService, appConfig } from './config';
import { DmsModule } from './dms/dms.module';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
	imports: [
		ConfigModule.forRoot({ cache: true, isGlobal: true, load: [appConfig] }),
		TypeOrmModule.forRootAsync({
			imports: [MariaDBConfigModule],
			useClass: MariaDBConfigService,
			inject: [MariaDBConfigService]
		}),
		ChannelsModule,
		DmsModule,
		UsersModule,
		WorkspacesModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [AppService, ConfigService]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggingMiddleware).forRoutes('*');
	}
}
