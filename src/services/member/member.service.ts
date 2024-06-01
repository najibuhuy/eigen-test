import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from 'src/schema/member.schema';
import { UpdateDataMemberDto, MemberAuthResponseDto, createDataMemberDto } from 'src/libs/dto/member.dto';
import { generateMemberCode, getAge } from 'src/libs/helper/global.helper';
import { ResponseMessageFailedEnum } from 'src/libs/dto/response.dto';
import { LoginMemberDto } from 'src/libs/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MemberService {
  constructor(
    @InjectModel('Member') private MemberModel: Model<Member>,
    private config: ConfigService,
    private jwt: JwtService,


) { }
  async getProfile(memberProfile: Member): Promise<MemberAuthResponseDto> {
    try{
      //count age
      let age = null
      if(memberProfile.dob) age = getAge(memberProfile.dob)
      let findMember = memberProfile;
      delete findMember._id;
      delete findMember.password;
      return {
        ...findMember,
        age : age
      }

    }catch (e) {
      Logger.log(e)
      throw { status : e.status,message : e.message}
    }

  }

  async updateProfile(memberProfile: Member, dataUpdate: UpdateDataMemberDto): Promise<MemberAuthResponseDto> {
    try{
      let age = null

      //convert horoscope & Zodiac and count age
      if(dataUpdate.dob) {
        age = getAge(dataUpdate.dob)
      }
      //update Member data from db
      await this.MemberModel.findByIdAndUpdate(
        memberProfile._id,
        {
          name : dataUpdate.name ? dataUpdate.name : memberProfile.name,
          image : dataUpdate.image ? dataUpdate.image : memberProfile.image,
          dob : dataUpdate.dob ? dataUpdate.dob : memberProfile.dob,
          gender : dataUpdate.gender ? dataUpdate.gender : memberProfile.gender,
         
        }
      )
      let findMember = await this.MemberModel.findById(memberProfile._id)
      findMember = findMember.toJSON();
      delete findMember._id;
      delete findMember.password;
      return {
        ...findMember,
        age: age
      }
    }catch (e) {
      Logger.log(e)
      throw { status : e.status,message : e.message}
    }

  }

  async getListMember(): Promise<Member[]> {
    try{
      return await this.MemberModel.find({});
      
    }catch (e) {
      Logger.log(e)
      throw { status : e.status,message : e.message}
    }

  }


}