import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupRequestDto {
	@IsEmail()
	@IsNotEmpty()
	public email: string;

	@IsString()
	@IsNotEmpty()
	public nickname: string;

	@IsString()
	@IsNotEmpty()
	public password: string;
}
