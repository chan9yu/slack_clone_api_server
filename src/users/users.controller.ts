import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';

import type { JwtPayload } from '../@types';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard, LocalAuthGuard } from '../auth/guards';
import { UserInfo } from '../common';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService
	) {}

	@Get()
	@UseInterceptors(ClassSerializerInterceptor)
	async getUsers() {
		return await this.usersService.getUsers();
	}

	@Get('my-info')
	@UseGuards(JwtAuthGuard)
	async getMyInfo(@UserInfo() userInfo: JwtPayload) {
		return await this.usersService.getMyInfo(userInfo);
	}

	@Post('signup')
	async signup(@Body() body: CreateUserDto) {
		return await this.usersService.createUser(body);
	}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	async login(@Request() req: { user: JwtPayload }) {
		return await this.authService.login(req.user);
	}
}
