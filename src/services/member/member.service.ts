import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from 'src/schema/member.schema';
import { UpdateDataMemberDto, MemberAuthResponseDto } from 'src/libs/dto/member.dto';
import { getAge } from 'src/libs/helper/global.helper';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('Member') private MemberModel: Model<Member>

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

}
