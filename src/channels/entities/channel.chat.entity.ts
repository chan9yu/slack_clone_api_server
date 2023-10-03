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

@Entity({ name: 'channelChat' })
export class ChannelChatEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text', { name: 'content' })
	content: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	/** 채널 ID */
	@Column('uuid', { name: 'channelId', nullable: true })
	channelId: string | null;

	/** 유저 ID */
	@Column('uuid', { name: 'userId', nullable: true })
	userId: string | null;

	/** 현재 채팅이 있는 채널 정보  */
	@ManyToOne(() => ChannelEntity, channel => channel.channelChats, {
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE'
	})
	@JoinColumn([{ name: 'channelId', referencedColumnName: 'id' }])
	channel: ChannelEntity;

	/** 현재 채팅을 입력한 유저 정보 */
	@ManyToOne(() => UserEntity, user => user.channelChats, {
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE'
	})
	@JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
	user: UserEntity;
}
