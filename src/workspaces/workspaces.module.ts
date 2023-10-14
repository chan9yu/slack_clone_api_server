import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelEntity, ChannelMemberEntity } from '../channels/entities';
import { UserEntity } from '../users/entities';
import { WorkspaceEntity, WorkspaceMemberEntity } from './entities';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ChannelEntity,
			ChannelMemberEntity,
			UserEntity,
			WorkspaceEntity,
			WorkspaceMemberEntity
		])
	],
	controllers: [WorkspacesController],
	providers: [WorkspacesService]
})
export class WorkspacesModule {}
