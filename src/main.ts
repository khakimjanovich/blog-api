import {NestFactory} from "@nestjs/core";
import {AppModule} from "./bootstrap/app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const PORT = process.env.APP_PORT || 3000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("API BACKEND")
        .setDescription("Documentation REST API")
        .setVersion("1.0.0")
        .addTag("KHAKIMJANOVICH")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    // app.setGlobalPrefix("/api");
    SwaggerModule.setup("/api/docs", app, document);

    // app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

bootstrap();
