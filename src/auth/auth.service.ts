import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import type { JwtPayload } from '../@types';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService
	) {}

	public async validateUser(email: string, password: string) {
		const user = await this.usersService.findUserByEmail(email);
		if (!user) return null;

		const match = await bcrypt.compare(password, user.password);
		if (!match) return null;

		return user;
	}

	public async login(user: JwtPayload) {
		const payload: JwtPayload = {
			id: user.id,
			email: user.email,
			nickname: user.nickname
		};

		const access_token = this.jwtService.sign(payload);

		return {
			access_token
		};
	}
}
