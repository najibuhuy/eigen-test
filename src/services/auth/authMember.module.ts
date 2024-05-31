import { Module } from '@nestjs/common';
import { AuthMemberController } from './authMember.controller';
import { AuthMemberService } from './authMember.service';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { ConfigModule } from '@nestjs/config';
import { MemberSchema } from 'src/schema/member.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    JwtModule.register({}), 
    ConfigModule,
    MongooseModule.forFeature([
        { name: 'Member', schema: MemberSchema },
      ]),
],
  controllers: [AuthMemberController],
  providers: [
    AuthMemberService,
    JwtStrategy,
  ],
})
export class AuthMemberModule {}