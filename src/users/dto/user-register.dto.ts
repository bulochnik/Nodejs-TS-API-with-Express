import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Wrong email address' })
	email: string;

	@IsString({ message: 'Password cannot be empty' })
	password: string;

	@IsString({ message: 'Name cannot be empty' })
	name: string;
}
