import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';

import type { JwtPayload } from '../@types';
import { ChannelMemberEntity } from '../channels/entities';
import { AUTH_EXCEPTION_CODE_ENUM } from '../common';
import { WorkspaceMemberEntity } from '../workspaces/entities';
import { CreateUserDto } from './dto';
import { UserEntity } from './entities';

@Injectable()
export class UsersService {
	constructor(
		private readonly dataSource: DataSource,
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
	) {}

	public async findUserByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: { email },
			select: ['email', 'password', 'nickname']
		});

		return user;
	}

	private async makeHashedPassword(password: string, saltOrRounds = 10) {
		const hashedPassword = await bcrypt.hash(password, saltOrRounds);
		return hashedPassword;
	}

	public async getUsers() {
		const users = await this.userRepository.find();
		return users;
	}

	public async getMyInfo(data: JwtPayload) {
		const { id } = data;

		const myInfo = await this.userRepository.findOne({
			where: { id },
			select: ['id', 'email', 'nickname'],
			relations: ['workspaces']
		});

		return myInfo;
	}

	public async createUser(data: CreateUserDto) {
		const { email, nickname, password } = data;

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		const user = await this.findUserByEmail(email);
		if (user) {
			const response = { errorCode: AUTH_EXCEPTION_CODE_ENUM.EMAIL_EXISTS };
			throw new HttpException(response, HttpStatus.UNAUTHORIZED);
		}

		const hashedPassword = await this.makeHashedPassword(password, 10);

		try {
			const newUser = await queryRunner.manager.getRepository(UserEntity).save({
				email,
				nickname,
				password: hashedPassword
			});

			await queryRunner.manager.getRepository(WorkspaceMemberEntity).save({
				userId: newUser.id,
				workspaceId: '1'
			});

			await queryRunner.manager.getRepository(ChannelMemberEntity).save({
				userId: newUser.id,
				channelId: '1'
			});

			await queryRunner.commitTransaction();

			return {
				statusCode: 200,
				message: 'success'
			};
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw error;
		} finally {
			await queryRunner.release();
		}
	}
}
