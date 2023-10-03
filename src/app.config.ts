import { registerAs } from '@nestjs/config';

export type AppConfig = typeof appConfig;

export const appConfig = registerAs('app', () => ({
	host: process.env.HOST || 'localhost',
	port: parseInt(process.env.PORT, 10) || 3000
}));
