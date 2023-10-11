declare namespace NodeJS {
	export interface ProcessEnv {
		// APP ENV
		HOST: string;
		PORT: string;
		APP_URL: string;
		DEV_URL: string;
		JWT_SECRET: string;

		// DATABASE ENV
		DB_HOST: string;
		DB_PORT: string;
		DB_USERNAME: string;
		DB_PASSWORD: string;
		DB_DATABASE: string;
	}
}
