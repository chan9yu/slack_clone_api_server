import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChannelEntity, ChannelMemberEntity } from '../channels/entities';
import { UserEntity } from '../users/entities';
import { WorkspaceEntity, WorkspaceMemberEntity } from './entities';
import { CreateWorkspaceDto } from './dto';

@Injectable()
export class WorkspacesService {
	constructor(
		@InjectRepository(ChannelEntity)
		private readonly channelRepository: Repository<ChannelEntity>,
		@InjectRepository(ChannelMemberEntity)
		private readonly channelMemberRepository: Repository<ChannelMemberEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(WorkspaceEntity)
		private readonly workspaceRepository: Repository<WorkspaceEntity>,
		@InjectRepository(WorkspaceMemberEntity)
		private readonly workspaceMemberRepository: Repository<WorkspaceMemberEntity>
	) {}

	async findById(id: string) {
		const workspace = this.workspaceRepository.findOne({ where: { id } });
		return workspace;
	}

	async findMyWorkspace(userId: string) {
		const workspace = this.workspaceRepository.find({ where: { workspaceMembers: [{ userId }] } });
		return workspace;
	}

	async createWorkspace(userId: string, data: CreateWorkspaceDto) {
		const { name, url } = data;

		const newWorkspace = this.workspaceRepository.create({
			name,
			url,
			ownerId: userId
		});
		await this.workspaceRepository.save(newWorkspace);

		const newWorkspaceMember = this.workspaceMemberRepository.create({
			workspaceId: newWorkspace.id,
			userId
		});
		await this.workspaceMemberRepository.save(newWorkspaceMember);

		const newChannel = this.channelRepository.create({
			workspaceId: newWorkspace.id,
			name: 'general'
		});
		await this.channelRepository.save(newChannel);

		const newChannelMember = this.channelMemberRepository.create({
			channelId: newChannel.id,
			userId
		});
		await this.channelMemberRepository.save(newChannelMember);

		return {
			statusCode: 200,
			message: 'success'
		};
	}

	async getWorkspaceMembers(url: string) {
		const workspaceMembers = this.userRepository
			.createQueryBuilder('user')
			.innerJoin('user.workspaceMembers', 'members')
			.innerJoin('members.workspace', 'workspace', 'workspace.url = :url', { url })
			.getMany();

		return workspaceMembers;
	}

	async createWorkspaceMembers(url: string, email: string) {
		const workspace = await this.workspaceRepository
			.createQueryBuilder('workspace')
			.innerJoinAndSelect('workspace.channels', 'channels', 'workspace.url = :url', { url })
			.getOne();

		const user = await this.userRepository.findOne({ where: { email } });
		if (!user) return null;

		const newWorkspaceMember = this.workspaceMemberRepository.create({
			workspaceId: workspace.id,
			userId: user.id
		});
		await this.workspaceMemberRepository.save(newWorkspaceMember);

		const newChannelMember = this.channelMemberRepository.create({
			channelId: workspace.channels.find(v => v.name === 'general').id,
			userId: user.id
		});
		await this.channelMemberRepository.save(newChannelMember);

		return {
			statusCode: 200,
			message: 'success'
		};
	}

	async getWorkspaceMember(userId: string, workspaceUrl: string) {
		const user = this.userRepository
			.createQueryBuilder('user')
			.where('user.id = :userId', { userId })
			.innerJoinAndSelect('user.workspaces', 'workspaces', 'workspaces.url = :workspaceUrl', {
				workspaceUrl
			})
			.getOne();

		return user;
	}
}
