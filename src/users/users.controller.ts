import { Body, Controller, Get, Post } from '@nestjs/common';

import { SignupRequestDto } from './dto/signup.request.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	async getUsers() {
		return await this.usersService.getUsers();
	}

	@Post()
	async signup(@Body() body: SignupRequestDto) {
		return await this.usersService.signup(body);
	}

	@Post('login')
	async login() {
		return await this.usersService.login();
	}

	@Post('logout')
	async logout() {
		return await this.usersService.logout();
	}
}
