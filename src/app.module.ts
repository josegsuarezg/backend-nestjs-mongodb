import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { ProductModule } from './product/product.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.config';

@Module({
  
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {useNewUrlParser: true}),
    ProductModule,
    CommonModule,
    AuthModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
