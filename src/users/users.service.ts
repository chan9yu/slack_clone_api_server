import { Injectable } from '@nestjs/common';

import { SignupRequestDto } from './dto/signup.request.dto';

@Injectable()
export class UsersService {
	async getUsers() {
		return 'getUsers';
	}

	async signup(data: SignupRequestDto) {
		const { email, nickname, password } = data;

		return { email, nickname, password };
	}

	async login() {
		return 'login';
	}

	async logout() {
		return 'logout';
	}
}
