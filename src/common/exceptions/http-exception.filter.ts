import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const httpRes = host.switchToHttp().getResponse<Response>();
		const status = exception.getStatus();
		const response = exception.getResponse();
		const errorRes = response?.['stack'] ? response?.['response'] : response;

		return httpRes.status(status).json({
			statusCode: status,
			errorCode: errorRes?.['errorCode'],
			message: errorRes?.['message']
		});
	}
}
