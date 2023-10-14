import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../users/entities';
import { WorkspaceEntity, WorkspaceMemberEntity } from '../workspaces/entities';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { ChannelChatEntity, ChannelEntity, ChannelMemberEntity } from './entities';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ChannelChatEntity,
			ChannelEntity,
			ChannelMemberEntity,
			UserEntity,
			WorkspaceEntity,
			WorkspaceMemberEntity
		])
	],
	controllers: [ChannelsController],
	providers: [ChannelsService]
})
export class ChannelsModule {}
