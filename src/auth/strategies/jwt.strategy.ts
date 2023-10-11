import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { JwtPayload } from '../../@types';
import { AppConfig, appConfig } from '../../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@Inject(appConfig.KEY)
		private readonly config: ConfigType<AppConfig>
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.jwt_secret,
			ignoreExpiration: false
		});
	}

	public async validate(payload: JwtPayload) {
		return payload;
	}
}
