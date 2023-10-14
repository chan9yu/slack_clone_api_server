import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkspaceDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	url: string;
}
