import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

import { UserEntity } from '../../users/entities';
import { WorkspaceEntity } from './workspace.entity';

@Entity({ name: 'workspaceMember' })
export class WorkspaceMemberEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column('datetime', { name: 'loggedInAt', nullable: true })
	loggedInAt: Date | null;

	/** 워크스페이스 ID */
	@Column('uuid', { name: 'workspaceId' })
	workspaceId: string;

	/** 유저 ID */
	@Column('uuid', { name: 'userId' })
	userId: string;

	/** 해당 유저에 대한 워크스페이스 정보 */
	@ManyToOne(() => WorkspaceEntity, workspace => workspace.workspaceMembers, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn([{ name: 'workspaceId', referencedColumnName: 'id' }])
	workspace: WorkspaceEntity;

	/** 해당 워크스페이스에 대한 유저 정보 */
	@ManyToOne(() => UserEntity, user => user.workspaceMembers, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
	user: UserEntity;
}
