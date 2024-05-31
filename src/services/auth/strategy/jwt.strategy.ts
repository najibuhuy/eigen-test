import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { Member } from 'src/schema/member.schema';
import { mongooseObjectId } from 'src/libs/helper/mongoose.helper';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    @InjectModel('Member') private MemberModel: Model<Member>
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: {
    sub: string;
  }) {
    
    //check payload
    const getMember = await this.MemberModel.findOne({
      _id : mongooseObjectId(payload.sub)
    })
    return getMember.toJSON()
    
  }
}
