import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

import { ChannelEntity } from '../../channels/entities';
import { DMEntity } from '../../dms/entities';
import { UserEntity } from '../../users/entities';
import { WorkspaceMemberEntity } from './workspace.member.entity';

@Entity({ name: 'workspace' })
export class WorkspaceEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { name: 'name', unique: true, length: 30 })
	name: string;

	@Column('varchar', { name: 'url', unique: true, length: 30 })
	url: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date | null;

	/** 소유자 ID */
	@Column('uuid', { name: 'ownerId', nullable: true })
	ownerId: string | null;

	/** 워크스페이스 소유자 정보 */
	@ManyToOne(() => UserEntity, user => user.ownedWorkspaces, {
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE'
	})
	@JoinColumn([{ name: 'ownerId', referencedColumnName: 'id' }])
	owner: UserEntity;

	/** 현재 워크스페이스의 채널 리스트 */
	@OneToMany(() => ChannelEntity, channel => channel.workspace)
	channels: ChannelEntity[];

	/** 현재 워크스페이스의 dm 리스트 */
	@OneToMany(() => DMEntity, dm => dm.workspace)
	dms: DMEntity[];

	/** 현재 워크스페이스에 멤버 리스트 */
	@OneToMany(() => WorkspaceMemberEntity, workspaceMember => workspaceMember.workspace, {
		cascade: ['insert']
	})
	workspaceMembers: WorkspaceMemberEntity[];

	@ManyToMany(() => UserEntity, user => user.workspaces)
	members: UserEntity[];
}
