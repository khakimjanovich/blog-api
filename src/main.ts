import {NestFactory} from "@nestjs/core";
import {AppModule} from "./bootstrap/app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationFilter} from "./bootstrap/filters/validation.filter";
import {ValidationError, ValidationPipe} from "@nestjs/common";
import {ValidationException} from "./bootstrap/exceptions/validation.exception";

async function bootstrap() {
    const PORT = process.env.APP_PORT || 3000;
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("/api");

    app.useGlobalFilters(new ValidationFilter());
    app.useGlobalPipes(new ValidationPipe({
        skipMissingProperties: false,
        exceptionFactory: (errors: ValidationError[]) => {
            const errMsg = {};
            errors.forEach(err => {
                errMsg[err.property] = [...Object.values(err.constraints)];
            });
            return new ValidationException(errMsg);
        }
    }));

    const config = new DocumentBuilder()
        .setTitle("API BACKEND")
        .setDescription("Documentation REST API")
        .setVersion("1.0.0")
        .addTag("KHAKIMJANOVICH")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, document);

    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

bootstrap();
