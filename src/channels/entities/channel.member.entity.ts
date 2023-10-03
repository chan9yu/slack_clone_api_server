import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';

import { ChannelEntity } from './channel.entity';
import { UserEntity } from 'src/users/entities';

@Entity({ name: 'channelMember' })
export class ChannelMemberEntity {
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
