import {
	HttpException,
	HttpStatus,
	ValidationPipe as NestValidationPipe,
	ValidationError
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

export class CustomValidationPipe extends NestValidationPipe {
	protected getExceptionObj(validationErrors: ValidationError[]) {
		const error = validationErrors[0];
		const { contexts, constraints } = error;

		const key = contexts ? Object.keys(contexts)[0] : undefined;
		const errorCode = contexts?.[key]['errorCode'];

		if (errorCode === undefined) {
			throw new Error('NOT_VALIDATION_ERROR_CODE');
		}

		const message = constraints?.[key];

		return {
			errorCode,
			message
		};
	}

	public createExceptionFactory() {
		return (validationErrors: ValidationError[] = []) => {
			const errors = this.getExceptionObj(validationErrors);

			return this.isDetailedOutputDisabled
				? new HttpErrorByCode[this.errorHttpStatusCode]()
				: new HttpException(errors, HttpStatus.BAD_REQUEST);
		};
	}
}
