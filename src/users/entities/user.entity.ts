import { Exclude } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

import { ChannelChatEntity, ChannelEntity, ChannelMemberEntity } from '../../channels/entities';
import { DMEntity } from '../../dms/entities';
import { WorkspaceEntity, WorkspaceMemberEntity } from '../../workspaces/entities';

@Entity({ name: 'user' })
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { name: 'email', unique: true })
	email: string;

	@Column('varchar', { name: 'nickname', length: 30 })
	nickname: string;

	@Column('varchar', { name: 'password', length: 100, select: false })
	@Exclude()
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date | null;

	/** 소유하고 있는 워크스페이스 리스트 */
	@OneToMany(() => WorkspaceEntity, workspace => workspace.owner)
	ownedWorkspaces: WorkspaceEntity[];

	/** 유저가 속한 워크스페이스 리스트 */
	@OneToMany(() => WorkspaceMemberEntity, workspaceMember => workspaceMember.user)
	workspaceMembers: WorkspaceMemberEntity[];

	/** 속하고 있는 채널의 채팅 리스트 */
	@OneToMany(() => ChannelChatEntity, channelChat => channelChat.user)
	channelChats: ChannelChatEntity[];

	/** 속하고 있는 채널의 맴버 리스트  */
	@OneToMany(() => ChannelMemberEntity, channelMember => channelMember.user)
	channelMembers: ChannelMemberEntity[];

	/** 보낸 DM 리스트 */
	@OneToMany(() => DMEntity, dm => dm.sender)
	sendDMs: DMEntity[];

	/** 받은 DM 리스트 */
	@OneToMany(() => DMEntity, dm => dm.receiver)
	recvDMs: DMEntity[];

	@ManyToMany(() => WorkspaceEntity, workspace => workspace.members)
	@JoinTable({
		name: 'workspaceMember',
		joinColumn: { name: 'userId', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'workspaceId', referencedColumnName: 'id' }
	})
	workspaces: WorkspaceEntity[];

	@ManyToMany(() => ChannelEntity, channel => channel.members)
	@JoinTable({
		name: 'channelMember',
		joinColumn: { name: 'userId', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'channelId', referencedColumnName: 'id' }
	})
	channels: ChannelEntity[];
}
