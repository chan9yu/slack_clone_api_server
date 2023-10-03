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
import { WorkspaceEntity } from '../../workspaces/entities';

@Entity({ name: 'dm' })
export class DMEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text', { name: 'content' })
	content: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	/** 워크스페이스 ID */
	@Column('uuid', { name: 'workspaceId', nullable: true })
	workspaceId: string | null;

	/** dm 보낸 user ID */
	@Column('uuid', { name: 'senderId', nullable: true })
	senderId: string | null;

	/** dm 받는 user ID */
	@Column('uuid', { name: 'receiverId', nullable: true })
	receiverId: string | null;

	/** dm들이 있는 현재 워크스페이스 정보 */
	@ManyToOne(() => WorkspaceEntity, workspace => workspace.dms, {
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE'
	})
	@JoinColumn([{ name: 'workspaceId', referencedColumnName: 'id' }])
	workspace: WorkspaceEntity;

	/** dm을 보낸 유저 정보 */
	@ManyToOne(() => UserEntity, user => user.sendDMs, {
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE'
	})
	@JoinColumn([{ name: 'senderId', referencedColumnName: 'id' }])
	sender: UserEntity;

	/** dm을 받은 유저 정보 */
	@ManyToOne(() => UserEntity, user => user.recvDMs, {
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE'
	})
	@JoinColumn([{ name: 'receiverId', referencedColumnName: 'id' }])
	receiver: UserEntity;
}
