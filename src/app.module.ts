import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { appConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
	imports: [
		ConfigModule.forRoot({ cache: true, isGlobal: true, load: [appConfig] }),
		ChannelsModule,
		DmsModule,
		UsersModule,
		WorkspacesModule
	],
	controllers: [AppController],
	providers: [AppService, ConfigService]
})
export class AppModule {}
