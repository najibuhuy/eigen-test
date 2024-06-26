import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from 'src/schema/member.schema';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({}), 
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'Member', schema: MemberSchema },
      
    ]),
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
