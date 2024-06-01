import { ForbiddenException, HttpCode, HttpStatus, Injectable, Logger} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import { Member } from 'src/schema/member.schema';
import { LoginMemberDto, RegisterMemberDto } from 'src/libs/dto/auth.dto';
import { MemberAuthResponseDto, createDataMemberDto } from 'src/libs/dto/member.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseMessageFailedEnum } from 'src/libs/dto/response.dto';
import { generateMemberCode } from 'src/libs/helper/global.helper';


@Injectable({})
export class AuthMemberService {
    constructor(
        @InjectModel('Member') private MemberModel: Model<Member>,
        private jwt: JwtService,
        private config: ConfigService,
    ) {
    }

    async registerMember(dataRegister: createDataMemberDto) : Promise<MemberAuthResponseDto> {
        try {
          //check email or username is already exist or not
          const getExistUser = await this.MemberModel.findOne({
            $or: [
              {email: dataRegister.email},
              {username: dataRegister.username}
            ]
          })
          if(getExistUser) {
            if(getExistUser.email === dataRegister.email) throw {status: HttpStatus.BAD_REQUEST, message: ResponseMessageFailedEnum.NOTUNIQUEEMAIL }
            else throw {status: HttpStatus.BAD_REQUEST, message: ResponseMessageFailedEnum.NOTUNIQUEUSERNAME }
          }
    
          //hash password
          const saltOrRound : number = 10
          const hash = await bcrypt.hash(dataRegister.password, saltOrRound)
          if(!hash) throw {status: HttpStatus.BAD_REQUEST, message: ResponseMessageFailedEnum.FAILEDPROCESS}
    
          //create the member
          let createMember = new this.MemberModel({
            username: dataRegister.username,
            email: dataRegister.email,
            password: hash,
            code: generateMemberCode(),
            dob : dataRegister.dob || null,
            name : dataRegister.name || null,
            gender: dataRegister.gender || null
          });
          await createMember.save()
          createMember = createMember.toJSON();

    
          //return
          delete createMember._id;
          delete createMember.password;
          return {
            ...createMember,
          }
    
        } catch (e) {
          Logger.log(e)
          throw { status : e.status,message : e.message}
        }
    
      }
    
      async loginMember(dto: LoginMemberDto) : Promise<MemberAuthResponseDto> {
        try{
    
            //get email exist or not
            let getExistUser = await this.MemberModel.findOne({
                $or : [
                    {email : dto.username},
                    {username: dto.username}
                ]
            })
            if(!getExistUser) throw {status: HttpStatus.NOT_FOUND, message: ResponseMessageFailedEnum.NOTFOUNDMEMBER }
            
            //validate password
            const isMatch = await bcrypt.compare(dto.password, getExistUser.password);
            if(!isMatch) throw {status: HttpStatus.UNAUTHORIZED, message: ResponseMessageFailedEnum.WRONGPASSWORD }
            
            //create token
            const token = await this.signToken(
                String(getExistUser._id)
            );
            getExistUser = getExistUser.toJSON();
            delete getExistUser._id;
            delete getExistUser.password;
            return {
                ...getExistUser,
                token : token
            }
    
        } catch (e){
            Logger.log(e)
            throw { status : e.status,message : e.message}
        }
      }

    async signToken(
        memberId: string,
    ): Promise<string> {
        const payload = {
            sub: memberId,
        };
        console.log(payload, "payload")
        const secret = this.config.get('JWT_SECRET');
        const expiresIn = this.config.get(
            'JWT_EXPIRES',
        );
        return this.jwt.signAsync(payload, {
            expiresIn: expiresIn,
            secret: secret,
        });
    }
}