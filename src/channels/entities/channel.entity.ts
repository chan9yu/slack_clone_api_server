import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

import { UserEntity } from '../../users/entities';
import { WorkspaceEntity } from '../../workspaces/entities';
import { ChannelChatEntity } from './channel.chat.entity';
import { ChannelMemberEntity } from './channel.member.entity';

@Entity({ name: 'channel' })
export class ChannelEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { name: 'name', length: 30 })
	name: string;

	@Column('tinyint', { name: 'private', nullable: true, width: 1, default: () => "'0'" })
	private: boolean | null;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	/** 워크스페이스 ID */
	@Column('uuid', { name: 'workspaceId', nullable: true })
	workspaceId: string | null;

	/** 현재 속한 워크스페이스 정보 */
	@ManyToOne(() => WorkspaceEntity, workspace => workspace.channels, {
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE'
	})
	@JoinColumn([{ name: 'workspaceId', referencedColumnName: 'id' }])
	workspace: WorkspaceEntity;

	/** 현재 채널의 채팅 리스트 */
	@OneToMany(() => ChannelChatEntity, channelChat => channelChat.channel)
	channelChats: ChannelChatEntity[];

	/** 현재 채널의 맴버 리스트 */
	@OneToMany(() => ChannelMemberEntity, channelMember => channelMember.channel, {
		cascade: ['insert']
	})
	channelMembers: ChannelMemberEntity[];

	@ManyToMany(() => UserEntity, user => user.workspaces)
	members: UserEntity[];
}
