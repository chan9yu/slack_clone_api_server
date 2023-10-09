import { Module, forwardRef } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../users/entities';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategies';

const jwtModuleOptions: JwtModuleOptions = {
	secret: 'secret_key',
	signOptions: {
		expiresIn: '1h'
	}
};

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		JwtModule.register(jwtModuleOptions),
		PassportModule,
		forwardRef(() => UsersModule)
	],
	providers: [AuthService, JwtStrategy, LocalStrategy],
	exports: [AuthService]
})
export class AuthModule {}
