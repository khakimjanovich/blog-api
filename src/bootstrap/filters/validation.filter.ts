import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from "@nestjs/common";
import {ValidationException} from "../exceptions/validation.exception";

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        return response.status(HttpStatus.BAD_REQUEST).json({
            status: false,
            message: 'Input validation exception!',
            error: exception.validationErrors
        });
    }
}