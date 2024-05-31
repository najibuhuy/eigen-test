import { ForbiddenException, HttpCode, HttpStatus, Injectable, Logger} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import { Member } from 'src/schema/member.schema';
import { LoginMemberDto, RegisterMemberDto } from 'src/libs/dto/auth.dto';
import { MemberAuthResponseDto } from 'src/libs/dto/member.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseMessageFailedEnum } from 'src/libs/dto/response.dto';


@Injectable({})
export class AuthMemberService {
    constructor(
        @InjectModel('Member') private MemberModel: Model<Member>,
        private jwt: JwtService,
        private config: ConfigService,
    ) {
    }

    async loginMember(dto: LoginMemberDto) : Promise<MemberAuthResponseDto> {
        try{

            //get email exist or not
            let getExistMember = await this.MemberModel.findOne({
                $or : [
                    {email : dto.username},
                    {username: dto.username}
                ]
            })
            if(!getExistMember) throw {status: HttpStatus.NOT_FOUND, message: ResponseMessageFailedEnum.NOTFOUNDMEMBER }
            
            //validate password
            const isMatch = await bcrypt.compare(dto.password, getExistMember.password);
            if(!isMatch) throw {status: HttpStatus.UNAUTHORIZED, message: ResponseMessageFailedEnum.WRONGPASSWORD }
            
            //create token
            const token = await this.signToken(
                String(getExistMember._id)
            );
            getExistMember = getExistMember.toJSON();
            delete getExistMember._id;
            delete getExistMember.password;
            return {
                ...getExistMember,
                token : token
            }

        } catch (e){
            Logger.log(e)
            throw { status : e.status,message : e.message}
        }
    }

    async registerMember(dto: RegisterMemberDto): Promise<MemberAuthResponseDto> {
        try {
            //get email exist or not
            const getExistMember : Member = await this.MemberModel.findOne({
                $or : [
                    {email : dto.email},
                    {username: dto.username}
                ]
            })
            if(getExistMember) {
                if(getExistMember.email === dto.email) throw {status: HttpStatus.BAD_REQUEST, message: ResponseMessageFailedEnum.NOTUNIQUEEMAIL }
                else throw {status: HttpStatus.BAD_REQUEST, message: ResponseMessageFailedEnum.NOTUNIQUEUSERNAME }
            }

            //hashing password
            const saltOrRound : number = 10
            const hash = await bcrypt.hash(dto.password, saltOrRound)
            if(!hash) throw {status: HttpStatus.BAD_REQUEST, message: ResponseMessageFailedEnum.FAILEDPROCESS}

            //create member
            let createMember  = await this.MemberModel.create({
                username: dto.username,
                email: dto.email,
                password: hash
            })
            if(!createMember) throw {status: HttpStatus.BAD_REQUEST, message: ResponseMessageFailedEnum.FAILEDPROCESS}

            //create token
            const token = await this.signToken(
                String(createMember._id)
            );
            createMember = createMember.toJSON();
            delete createMember._id;
            delete createMember.password;
            return {
                ...createMember,
                token : token
            }
        } catch (e) {
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