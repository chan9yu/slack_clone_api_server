import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { AUTH_EXCEPTION_CODE_ENUM } from '../../common';

export class CreateUserDto {
	@IsEmail({}, { context: { errorCode: 'MUST_EMAIL_TYPE' } })
	@IsNotEmpty({ context: { errorCode: 'EMPTY_EMAIL' } })
	public email: string;

	@IsString({ context: { errorCode: 'MUST_STRING_TYPE' } })
	@IsNotEmpty({ context: { errorCode: 'EMPTY_NICKNAME' } })
	@MinLength(2, { context: { errorCode: 'TEMP_ERROR' } })
	public nickname: string;

	@IsString({ context: { errorCode: 'MUST_STRING_TYPE' } })
	@IsNotEmpty({ context: { errorCode: 'EMPTY_PASSWORD' } })
	@MinLength(6, { context: { errorCode: 'TEMP_ERROR' } })
	public password: string;
}
