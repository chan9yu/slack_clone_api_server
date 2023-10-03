import { registerAs } from '@nestjs/config';

export type AppConfig = typeof appConfig;

export const appConfig = registerAs('app', () => ({
	host: process.env.HOST || 'localhost',
	port: parseInt(process.env.PORT, 10) || 3000,
	db: {
		host: process.env.DB_HOST || 'localhost',
		port: parseInt(process.env.DB_PORT, 10) || 3306,
		username: process.env.DB_USERNAME || 'root',
		password: process.env.DB_PASSWORD || 'root',
		database: process.env.DB_DATABASE || 'test'
	}
}));
