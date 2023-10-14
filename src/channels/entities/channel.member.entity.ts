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
import { ChannelEntity } from './channel.entity';

@Entity({ name: 'channelMember' })
export class ChannelMemberEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	/** 채널 ID */
	@Column('uuid', { name: 'channelId' })
	channelId: string;

	/** 유저 ID */
	@Column('uuid', { name: 'userId' })
	userId: string;

	/** 채널 정보 */
	@ManyToOne(() => ChannelEntity, channel => channel.channelMembers, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn([{ name: 'channelId', referencedColumnName: 'id' }])
	channel: ChannelEntity;

	/** 유저 정보 */
	@ManyToOne(() => UserEntity, user => user.channelMembers, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
	user: UserEntity;
}
