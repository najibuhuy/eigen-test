import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import * as Joi from '@hapi/joi';

import {ConfigModule} from '@nestjs/config';

import {LoggerMiddleware} from "./utils";
import { MemberModule} from './services/member/member.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMemberModule } from './services/auth/authMember.module';
import { LoanModule } from './services/loan/loan.module';
import { BookModule } from './services/book/book.module';
import { CronModule } from './services/cron/cron.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                DATABASE_URL: Joi.string().required(),
                DBNAME: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRES: Joi.string().required(),
                NODE_PORT: Joi.string().required(),
            })
        }),
        MongooseModule.forRoot(process.env.DATABASE_URL, {
            dbName: process.env.DBNAME,
          }),
        MemberModule,
        AuthMemberModule,
        LoanModule,
        BookModule,
        CronModule

    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
