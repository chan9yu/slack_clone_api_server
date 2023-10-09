import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { AUTH_EXCEPTION_CODE_ENUM } from '../common';
import { CreateUserDto } from './dto';
import { UserEntity } from './entities';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	public async findUserByEmail(email: string) {
		const user = await this.userRepository.findOneBy({ email });
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

	public async createUser(data: CreateUserDto) {
		const { email, nickname, password } = data;

		const user = await this.findUserByEmail(email);
		if (user) {
			const response = { errorCode: AUTH_EXCEPTION_CODE_ENUM.EMAIL_EXISTS };
			throw new HttpException(response, HttpStatus.UNAUTHORIZED);
		}

		const hashedPassword = await this.makeHashedPassword(password, 10);
		const createUserData = {
			email,
			nickname,
			password: hashedPassword
		};

		return await this.userRepository.save(createUserData);
	}
}
