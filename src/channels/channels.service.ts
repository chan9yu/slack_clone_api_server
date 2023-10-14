import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { UserEntity } from '../users/entities';
import { WorkspaceEntity, WorkspaceMemberEntity } from '../workspaces/entities';
import { ChannelChatEntity, ChannelEntity, ChannelMemberEntity } from './entities';

@Injectable()
export class ChannelsService {
	constructor(
		@InjectRepository(ChannelEntity)
		private readonly channelRepository: Repository<ChannelEntity>,
		@InjectRepository(ChannelMemberEntity)
		private readonly channelMemberRepository: Repository<ChannelMemberEntity>,
		@InjectRepository(ChannelChatEntity)
		private readonly channelChatRepository: Repository<ChannelChatEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(WorkspaceEntity)
		private readonly workspaceRepository: Repository<WorkspaceEntity>,
		@InjectRepository(WorkspaceMemberEntity)
		private readonly workspaceMemberRepository: Repository<WorkspaceMemberEntity>
	) {}

	async findById(id: string) {
		const channel = this.channelRepository.findOne({ where: { id } });
		return channel;
	}

	async getWorkspaceChannels(userId: string, workspaceUrl: string) {
		const channels = this.channelRepository
			.createQueryBuilder('channels')
			.innerJoinAndSelect(
				'channels.channelMembers',
				'channelMembers',
				'channelMembers.userId = :userId',
				{ userId }
			)
			.innerJoinAndSelect('channels.workspace', 'workspace', 'workspace.url = :workspaceUrl', {
				workspaceUrl
			})
			.getMany();

		return channels;
	}

	async getWorkspaceChannel(channelName: string, workspaceUrl: string) {
		const channel = this.channelRepository.findOne({
			where: { name: channelName },
			relations: ['workspace']
		});

		return channel;
	}

	async getChannelChats(channelName: string, workspaceUrl: string, perPage: number, page: number) {
		const channelChats = this.channelChatRepository
			.createQueryBuilder('channelChats')
			.innerJoin('channelChats.channel', 'channel', 'channel.name = :channelName', { channelName })
			.innerJoin('channel.workspace', 'workspace', 'workspace.url = :workspaceUrl', {
				workspaceUrl
			})
			.innerJoinAndSelect('channelChats.user', 'user')
			.orderBy('channelChats.createAt', 'DESC')
			.take(perPage)
			.skip(perPage * (page - 1))
			.getMany();

		return channelChats;
	}

	async getChannelUnreadsCount(channelName: string, workspaceUrl: string, after: any) {
		const channel = await this.channelRepository
			.createQueryBuilder('channel')
			.innerJoin('channel.workspace', 'workspace', 'workspace.url = :workspaceUrl', {
				workspaceUrl
			})
			.where('channel.name = :channelName', { channelName })
			.getOne();

		const channelUnreadsCount = await this.channelChatRepository.count({
			where: {
				channelId: channel.id,
				createdAt: MoreThan(new Date(after))
			}
		});

		return channelUnreadsCount;
	}
}

/**
 * channel name과
 * workspace url
 * INDEX 설정하기
 */
