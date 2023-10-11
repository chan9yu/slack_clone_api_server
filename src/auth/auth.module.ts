import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../users/entities';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secret: config.get<string>('JWT_SECRET'),
				signOptions: {
					expiresIn: '1h'
				}
			})
		}),
		PassportModule,
		forwardRef(() => UsersModule)
	],
	providers: [AuthService, JwtStrategy, LocalStrategy],
	exports: [AuthService]
})
export class AuthModule {}
