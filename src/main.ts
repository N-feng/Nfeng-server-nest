import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { ValidationPipe } from './pipe/validation.pipe';
// import { AuthGuard } from './guard/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 配置静态资源目录
  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  // 配置cookie中间件
  app.use(cookieParser('this signed cookies'));

  // 配置session的中间件
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    // cookie: { maxAge: 109000, httpOnly: true },
    rolling: true
  }));

  // 全局配置管道
  app.useGlobalPipes(new ValidationPipe());

  // 全局配置守卫
  // app.useGlobalGuards(new AuthGuard());

  // 配置swagger
  const options = new DocumentBuilder()
    .setTitle('nfeng-backend-nest')
    .setDescription('my first NestJs project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
